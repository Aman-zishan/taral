import { Client, NativeClarityBinProvider } from "@blockstack/clarity";
import {
  ClarityAbiFunction,
  ClarityAbiType,
  ClarityAbiVariable,
  ClarityType,
  cvToString,
  deserializeCV,
  responseErrorCV,
  responseOkCV,
} from "@stacks/transactions";
import { err, ok } from "neverthrow";
import { BaseProvider, IProviderRequest } from ".";
import {
  deployContract,
  evalJson,
  evalWithCode,
  executeJson,
  getDefaultClarityBin,
} from "../adapter";
import { ClarityAbiMap, cvToValue, parseToCV } from "../clarity";
import { ClarinetAccounts } from "../configuration";
import { Submitter, Transaction, TransactionResult } from "../transaction";
import {
  ContractInstances,
  Contracts,
  CreateOptions,
  EvalOk,
  FromContractOptions,
} from "../types";
import { getContractIdentifier, getContractNameFromPath } from "../utils";
import { instanceOfMetadata } from "./types";

export class TestProvider implements BaseProvider {
  clarityBin: NativeClarityBinProvider;
  client: Client;

  constructor(clarityBin: NativeClarityBinProvider, client: Client) {
    this.clarityBin = clarityBin;
    this.client = client;
  }

  static async create({
    deploy,
    clarityBin,
    contractFilePath,
    contractIdentifier,
  }: CreateOptions) {
    const client = new Client(contractIdentifier, contractFilePath, clarityBin);
    
    if (deploy) {
      await deployContract(client, clarityBin);
    }

    return new this(clarityBin, client);
  }

  static async fromContract<T>({
    deploy,
    contract,
    clarityBin,
  }: FromContractOptions<T>) {
    const { address } = contract;
    if (!address) {
      throw new Error("TestProvider must have an address");
    }
    const contractName = getContractNameFromPath(contract.contractFile);

    const provider = await this.create({
      deploy,
      clarityBin,
      contractFilePath: contract.contractFile,
      contractIdentifier: `${address}.${contractName}`,
    });
    return contract.contract(provider);
  }

  public static async fromContracts<T extends Contracts<M>, M>(
    deploy: boolean,
    contracts: T,
    clarityBin?: NativeClarityBinProvider
  ): Promise<ContractInstances<T, M>>;
  public static async fromContracts<T extends Contracts<M>, M>(
    deploy: boolean,
    contracts: T,
    accounts?: ClarinetAccounts
  ): Promise<ContractInstances<T, M>>;
  public static async fromContracts<T extends Contracts<M>, M>(
    deploy: boolean,
    contracts: T,
    clarityBinOrAccounts?: NativeClarityBinProvider | ClarinetAccounts
  ): Promise<ContractInstances<T, M>> {
    const clarityBin = await getDefaultClarityBin(clarityBinOrAccounts);
    const instances = {} as ContractInstances<T, M>;

    // Disabling the util contract deployment for now
    //
    // await deployUtilContract(clarityBin, "test-util");
    for (const k in contracts) {
      const contract = contracts[k];
      const instance = await this.fromContract({
        deploy,
        contract,
        clarityBin,
      });
      instances[k] = {
        identifier: getContractIdentifier(contract),
        contract: instance as ReturnType<T[typeof k]["contract"]>,
      };
    }
    return instances;
  }

  async callMap(map: ClarityAbiMap, key: any): Promise<void> {
    const keyFormatted = this.formatArgument(map.key, key);
    const evalCode = `(map-get? ${map.name} ${keyFormatted})`;
    const result = await evalWithCode({
      contractAddress: this.client.name,
      evalCode,
      provider: this.clarityBin,
    });
    return this.handleEvalResponse(result);
  }

  async callVariable(variable: ClarityAbiVariable): Promise<void> {
    let evalCode: string;
    if (variable.access === "constant") {
      evalCode = `${variable.name}`;
    } else {
      evalCode = `(var-get ${variable.name})`;
    }
    const result = await evalWithCode({
      contractAddress: this.client.name,
      evalCode,
      provider: this.clarityBin,
    });
    return this.handleEvalResponse(result);
  }

  async callReadOnly(request: IProviderRequest) {
    const argsFormatted = this.formatArguments(
      request.function,
      request.arguments
    );
    const result = await evalJson({
      contractAddress: this.client.name,
      functionName: request.function.name,
      args: argsFormatted,
      provider: this.clarityBin,
    });

    return this.handleEvalResponse(result);
  }

  callPublic(request: IProviderRequest): Transaction<any, any> {
    const argsFormatted = this.formatArguments(
      request.function,
      request.arguments
    );
    const submit: Submitter<any, any> = async (options) => {
      if (!("sender" in options)) {
        throw new Error("Passing `sender` is required.");
      }
      const receipt = await executeJson({
        provider: this.clarityBin,
        contractAddress: this.client.name,
        senderAddress: options.sender,
        functionName: request.function.name,
        args: argsFormatted,
      });
      const getResult = (): Promise<TransactionResult<any, any>> => {
        const resultCV = deserializeCV(
          Buffer.from(receipt.output_serialized, "hex")
        );
        const result = cvToValue(resultCV);
        if (receipt.success) {
          return Promise.resolve({
            isOk: true,
            response: responseOkCV(resultCV),
            value: result,
            events: receipt.events,
            costs: receipt.costs,
            assets: receipt.assets,
          });
        } else {
          return Promise.resolve({
            isOk: false,
            response: responseErrorCV(resultCV),
            value: result,
            costs: receipt.costs,
          });
        }
      };
      return {
        getResult,
      };
    };
    return {
      submit,
    };
  }

  formatArguments(func: ClarityAbiFunction, args: any[]): string[] {
    var metadata = args.filter((arg) => instanceOfMetadata(arg));

    if (metadata.length > 1) {
      throw new TypeError("More than one metadata objects");
    }

    var argsWithoutMetadata =
      metadata.length == 1 ? args.filter((x) => x !== metadata[0]) : args;

    var formatted = argsWithoutMetadata.map((arg, index) => {
      const { type } = func.args[index];
      return this.formatArgument(type, arg);
    });

    return formatted;
  }

  formatArgument(type: ClarityAbiType, arg: any) {
    if (type === "trait_reference") {
      return `'${arg}`;
    }
    const argCV = parseToCV(arg, type);
    const cvString = cvToString(argCV);
    if (type === "principal") {
      return `'${cvString}`;
    }
    return cvString;
  }

  handleEvalResponse(result: EvalOk) {
    const resultCV = deserializeCV(
      Buffer.from(result.output_serialized, "hex")
    );
    const value = cvToValue(resultCV);
    switch (resultCV.type) {
      case ClarityType.ResponseOk:
        return ok(value);
      case ClarityType.ResponseErr:
        return err(value);
      default:
        return value;
    }
  }
}

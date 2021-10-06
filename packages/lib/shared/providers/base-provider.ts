import { ClarityAbiVariable } from "@stacks/transactions";
import { INodeProviderRequest, IWebProviderRequest } from "..";
import { ClarityAbiMap } from "../clarity";
import { Transaction } from "../transaction";

export abstract class BaseProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  async callReadOnly(_request: any): Promise<any> {
    throw new Error("Not implemented");
  }

  callPublic(_request: any): Transaction<any, any> {
    throw new Error("Not implemented");
  }

  async callMap(_map: ClarityAbiMap, _key: any) {
    throw new Error("Not implemented");
  }

  async callVariable(_variable: ClarityAbiVariable) {
    throw new Error("Not implemented");
  }
}

export abstract class BaseNodeProvider extends BaseProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  async callReadOnly(_request: INodeProviderRequest): Promise<any> {
    throw new Error("Not implemented");
  }

  callPublic(_request: INodeProviderRequest): Transaction<any, any> {
    throw new Error("Not implemented");
  }

  async callMap(_map: ClarityAbiMap, _key: any) {
    throw new Error("Not implemented");
  }

  async callVariable(_variable: ClarityAbiVariable) {
    throw new Error("Not implemented");
  }
}

export abstract class BaseWebProvider extends BaseProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  async callReadOnly(_request: IWebProviderRequest): Promise<any> {
    throw new Error("Not implemented");
  }

  callPublic(_request: IWebProviderRequest): Transaction<any, any> {
    throw new Error("Not implemented");
  }

  async callMap(_map: ClarityAbiMap, _key: any) {
    throw new Error("Not implemented");
  }

  async callVariable(_variable: ClarityAbiVariable) {
    throw new Error("Not implemented");
  }
}

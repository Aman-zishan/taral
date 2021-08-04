import { readFileSync } from "fs";
import { CONTRACT_FOLDER } from "../shared/constants";
import { generateFilesForContract } from "../shared/abi";
import { ADDR1 } from "../configuration";
import { createDefaultTestProvider } from "../shared/default-test-provider";
import { contractWithSubDirectory } from "../shared/utils/contract-with-subdirectory";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { getContractNameFromPath } from "../shared/utils/contract-name-for-path";
import { toCamelCase } from "../shared/utils/to-camel-case";
import { GENERATION_FOLDER } from "./contracts";
interface IProject {
  configuration: IProjectConfiguration[];
}

interface IProjectConfiguration {
  name: string;
  description: string;
  subfolder: string;
  contracts: string[];
}

async function generate() {
  const contractsConfigurationFile = readFileSync(
    `./${CONTRACT_FOLDER}/contracts.json`,
    "utf-8"
  );

  const project: IProject = JSON.parse(contractsConfigurationFile);

  var contractGroups: IContractGroup[] = project.configuration.map(
    (configuration) => {
      return {
        contracts: configuration.contracts,
        subFolder: configuration.subfolder,
      };
    }
  );

  // await generateAbis(contractGroups);
  await generateProjectIndexFile(contractGroups);
}

interface IProject {
  configuration: IProjectConfiguration[];
}

interface IProjectConfiguration {
  name: string;
  description: string;
  contracts: string[];
}

interface IContractGroup {
  subFolder: string;
  contracts: string[];
}

export async function generateAbis(groups: IContractGroup[]): Promise<void> {
  const provider = await createDefaultTestProvider();

  for (let group of groups) {
    for (let contract of group.contracts) {
      await generateFilesForContract({
        contractFile: contractWithSubDirectory(contract, group.subFolder),
        outputFolder: GENERATION_FOLDER,
        contractAddress: ADDR1,
        subFolder: group.subFolder,
        provider,
      });
    }
  }
}

export async function generateProjectIndexFile(
  groups: IContractGroup[]
): Promise<void> {
  const imports: string[] = [];
  const exports: string[] = [];
  const contractMap: string[] = [];

  for (let group of groups) {
    for (let contract of group.contracts) {
      const contractName = getContractNameFromPath(contract);
      const contractVar = toCamelCase(contractName);
      const contractInfo = `${contractVar}Info`;
      const contractInterface = `${toCamelCase(contractName, true)}Contract`;
      const importPath = `'./${group.subFolder}/${contractName}'`;
      const _import = `import { ${contractInfo} } from ${importPath};`;
      imports.push(_import);

      const _export = `export type { ${contractInterface} } from ${importPath};`;
      exports.push(_export);

      const map = `${contractVar}: ${contractInfo},`;
      contractMap.push(map);
    }
  }

  const file = `${imports.join("\n")}
    ${exports.join("\n")}
    
    export const contracts = {
      ${contractMap.join("\n  ")}
    };
    `;
  await writeFile(resolve(GENERATION_FOLDER, "index.ts"), file);
}

generate();

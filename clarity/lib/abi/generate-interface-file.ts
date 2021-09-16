import { ClarityAbi } from "../clarity";
import { getContractNameFromPath, toCamelCase } from "../utils";

export function generateInterfaceFile({
  contractFile,
  relativeImportPath,
  abi,
}: {
  contractFile: string;
  relativeImportPath: string;
  abi: ClarityAbi;
}) {
  const contractName = getContractNameFromPath(contractFile);
  const variableName = toCamelCase(contractName, true);
  const abiString = JSON.stringify(abi, null, 2);

  const fileContents = `import { ClarityAbi } from '${relativeImportPath}lib/clarity/types';

// prettier-ignore

export const ${variableName}Interface: ClarityAbi = ${abiString};
`;

  return fileContents;
}

export function generateMockInterfaceFile({
  contractFile,
  relativeImportPath,
  abi,
}: {
  contractFile: string;
  relativeImportPath: string;
  abi: ClarityAbi;
}) {
  const contractName = getContractNameFromPath(contractFile);
  const variableName = toCamelCase(contractName, true);
  const abiString = JSON.stringify(abi, null, 2);

  const fileContents = `import { ClarityAbi } from '${relativeImportPath}/clarity/types';

// prettier-ignore

export const ${variableName}Interface: ClarityAbi = ${abiString};
`;

  return fileContents;
}


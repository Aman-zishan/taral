import { mkdir, writeFile } from "fs/promises";
import { normalize, relative, resolve } from "path";
import {
  generateIndexFile,
  generateInterface,
  generateInterfaceFile,
  generateMockIndexFile,
  generateMockInterfaceFile,
  generateMockTypesFile,
  generateTypesFile,
} from ".";
import { NativeClarityBinProvider } from "../native-cli/native-provider";
import {
  cleanupBootContractsCalls,
  cleanupTmpContractFile,
} from "../test-utils/cleanup-boot-contract-calls";
import { getContractNameFromPath } from "../utils";

export async function submitAnalisysForContract({
  contractFile: _contractFile,
  outputFolder,
  subFolder,
  provider,
  generate,
  contractAddress,
}: {
  contractFile: string;
  outputFolder: string;
  subFolder: string;
  provider: NativeClarityBinProvider;
  generate: boolean;
  contractAddress?: string;
}) {
  const contractFile = resolve(normalize(_contractFile)).replace(/\\/g, "/");

  let tmpContractFilePath = cleanupBootContractsCalls(contractFile);
  const contractName = getContractNameFromPath(contractFile);

  const abi = await generateInterface({
    contractFile: tmpContractFilePath,
    provider,
    contractAddress,
  });

  if (generate) {
    const typesFile = generateMockTypesFile(abi, contractName);
    if (!contractAddress && process.env.NODE_ENV !== "test") {
      console.warn("Please provide an address with every contract.");
    }

    const indexFile = generateMockIndexFile({
      contractFile: relative(process.cwd(), tmpContractFilePath).replace(
        /\\/g,
        "/"
      ),
      address: contractAddress || "",
      subFolder: subFolder,
    });

    const abiFile = generateMockInterfaceFile({
      contractFile,
      abi,
    });

    const outputPath = resolve(
      `${outputFolder}/${subFolder}`,
      ".",
      contractName
    );
    await mkdir(outputPath, { recursive: true });

    await writeFile(resolve(outputPath, "abi.ts"), abiFile);
    await writeFile(resolve(outputPath, "index.ts"), indexFile);
    await writeFile(resolve(outputPath, "types.ts"), typesFile);
  }

  cleanupTmpContractFile(tmpContractFilePath);
}

export async function generateFilesForContract({
  contractFile: _contractFile,
  outputFolder,
  subFolder,
  provider,
  contractAddress,
}: {
  contractFile: string;
  outputFolder: string;
  subFolder: string;
  provider: NativeClarityBinProvider;
  contractAddress?: string;
}) {
  const contractFile = resolve(_contractFile).replace(/\\/g, "/");

  const contractName = getContractNameFromPath(contractFile);

  let tmpContractFilePath = cleanupBootContractsCalls(contractFile);

  const abi = await generateInterface({
    contractFile: tmpContractFilePath,
    provider,
    contractAddress,
  });

  cleanupTmpContractFile(tmpContractFilePath);

  const typesFile = generateTypesFile(abi, contractName);
  if (!contractAddress && process.env.NODE_ENV !== "test") {
    console.warn("Please provide an address with every contract.");
  }

  const indexFile = generateIndexFile({
    contractFile: relative(process.cwd(), contractFile).replace(/\\/g, "/"),
    address: contractAddress || "",
    subFolder: subFolder,
  });

  const abiFile = generateInterfaceFile({
    contractFile,
    abi,
  });

  const outputPath = resolve(`${outputFolder}/${subFolder}`, ".", contractName);
  await mkdir(outputPath, { recursive: true });

  await writeFile(resolve(outputPath, "abi.ts"), abiFile);
  await writeFile(resolve(outputPath, "index.ts"), indexFile);
  await writeFile(resolve(outputPath, "types.ts"), typesFile);
}

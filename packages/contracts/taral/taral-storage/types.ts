import { ClarityTypes, Transaction } from "lib-shared";

export interface TaralStorageContract {
  addPrincipalToRole: (
    roleToAdd: number | bigint,
    principalToAdd: string
  ) => Transaction<boolean, bigint>;
  grantAccess: (
    participant: string,
    fileId: string,
    canRead: boolean,
    canWrite: boolean
  ) => Transaction<boolean, bigint>;
  initialize: (
    nameToSet: string,
    symbolToSet: string,
    decimalsToSet: number | bigint,
    initialOwner: string
  ) => Transaction<boolean, bigint>;
  registerFile: (
    fileId: string,
    filename: string,
    hash: Buffer,
    signature: Buffer
  ) => Transaction<string, bigint>;
  removePrincipalFromRole: (
    roleToRemove: number | bigint,
    principalToRemove: string
  ) => Transaction<boolean, bigint>;
  revokeAccess: (
    fileId: string,
    participant: string
  ) => Transaction<boolean, bigint>;
  updateAccess: (
    participant: string,
    fileId: string,
    canRead: boolean,
    canWrite: boolean
  ) => Transaction<boolean, bigint>;
  updateBlacklisted: (
    principalToUpdate: string,
    setBlacklisted: boolean
  ) => Transaction<boolean, bigint>;
  updateFile: (
    fileId: string,
    hash: Buffer,
    signature: Buffer
  ) => Transaction<boolean, bigint>;
  canReadFile: (
    participant: string,
    fileId: string
  ) => Promise<ClarityTypes.Response<boolean, null>>;
  canWriteFile: (
    participant: string,
    fileId: string
  ) => Promise<ClarityTypes.Response<boolean, null>>;
  detectRestriction: (
    participant: string
  ) => Promise<ClarityTypes.Response<bigint, bigint>>;
  getFileHash: (
    fileId: string
  ) => Promise<ClarityTypes.Response<Buffer, bigint>>;
  hasRole: (
    roleToCheck: number | bigint,
    principalToCheck: string
  ) => Promise<boolean>;
  hashMessage: (message: Buffer) => Promise<Buffer>;
  isBlacklisted: (principalToCheck: string) => Promise<boolean>;
  validateSignature: (
    hash: Buffer,
    signature: Buffer,
    signer: string
  ) => Promise<boolean>;
  BLACKLISTER_ROLE: () => Promise<bigint>;
  ERR_EMPTY_FILENAME: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_HASH: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FILE_ALREADY_REGISTERED: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  ERR_FILE_NOT_FOUND: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_FILE_ID: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_PRINCIPAL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_ROLE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NOT_FOUND: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_UNAUTHORIZED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_UNEXPECTED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_UNKNOWN_FILE_ACCESS: () => Promise<ClarityTypes.Response<null, bigint>>;
  OWNER_ROLE: () => Promise<bigint>;
  PERMISSION_DENIED_ERROR: () => Promise<bigint>;
  RESTRICTION_BLACKLIST: () => Promise<bigint>;
  RESTRICTION_NONE: () => Promise<bigint>;
  messagePrefix: () => Promise<Buffer>;
  deployerPrincipal: () => Promise<string>;
  isInitialized: () => Promise<boolean>;
  owner: () => Promise<string>;
  blacklist: (key: { account: string }) => Promise<{
    blacklisted: boolean;
  } | null>;
  fileAuthorizations: (key: { id: string; participant: string }) => Promise<{
    "can-read": boolean;
    "can-write": boolean;
    owns: boolean;
  } | null>;
  fileHash: (key: { id: string }) => Promise<{
    hash: Buffer;
    name: string;
  } | null>;
  fileVersions: (key: { hash: Buffer; id: string }) => Promise<{
    "changed-by": string;
  } | null>;
  files: (key: { id: string }) => Promise<{
    created: bigint;
    hash: Buffer;
    "last-updated": bigint;
    name: string;
  } | null>;
  filesByName: (key: {
    hash: Buffer;
    name: string;
    participant: string;
  }) => Promise<{
    id: string;
  } | null>;
  roles: (key: { account: string; role: bigint }) => Promise<{
    allowed: boolean;
  } | null>;
}

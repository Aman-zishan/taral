import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoSwapTraitV1Interface } from "./abi";
import type { ArkadikoSwapTraitV1Contract } from "./types";

export type { ArkadikoSwapTraitV1Contract } from "./types";

export const arkadikoSwapTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapTraitV1Contract>(
    ArkadikoSwapTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoSwapTraitV1Info: Contract<ArkadikoSwapTraitV1Contract> = {
  contract: arkadikoSwapTraitV1Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "clarity/contracts/external/arkadiko/arkadiko-swap-trait-v1.clar",
};

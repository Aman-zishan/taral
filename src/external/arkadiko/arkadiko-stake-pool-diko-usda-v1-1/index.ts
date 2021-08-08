import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoStakePoolDikoUsdaV11Interface } from "./abi";
import type { ArkadikoStakePoolDikoUsdaV11Contract } from "./types";

export type { ArkadikoStakePoolDikoUsdaV11Contract } from "./types";

export const arkadikoStakePoolDikoUsdaV11Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoStakePoolDikoUsdaV11Contract>(
    ArkadikoStakePoolDikoUsdaV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolDikoUsdaV11Info: Contract<ArkadikoStakePoolDikoUsdaV11Contract> =
  {
    contract: arkadikoStakePoolDikoUsdaV11Contract,
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "contracts/external/arkadiko/arkadiko-stake-pool-diko-usda-v1-1.clar",
  };

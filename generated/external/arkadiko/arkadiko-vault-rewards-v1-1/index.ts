
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoVaultRewardsV11Contract } from './types';
import { ArkadikoVaultRewardsV11Interface } from './abi';

export type { ArkadikoVaultRewardsV11Contract } from './types';

export const arkadikoVaultRewardsV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoVaultRewardsV11Contract>(ArkadikoVaultRewardsV11Interface, provider);
  return contract;
};

export const arkadikoVaultRewardsV11Info: Contract<ArkadikoVaultRewardsV11Contract> = {
  contract: arkadikoVaultRewardsV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-vault-rewards-v1-1.clar',
};

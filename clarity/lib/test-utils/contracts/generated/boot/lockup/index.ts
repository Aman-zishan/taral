
import { Contract } from '../../../../../types';
import { proxy } from '../../../../../test-utils/proxy';
import { BaseProvider } from '../../../../../providers/base-provider';

import type { LockupContract } from './types';
import { LockupInterface } from './abi';

export type { LockupContract } from './types';

export const lockupContract = (provider: BaseProvider) => {
  const contract = proxy<LockupContract>(LockupInterface, provider);
  return contract;
};

export const lockupInfo: Contract<LockupContract> = {
  contract: lockupContract,
  address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractFile: 'clarity/contracts/boot/lockup.clar',
};

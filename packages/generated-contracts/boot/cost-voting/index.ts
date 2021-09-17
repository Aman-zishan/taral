
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { CostVotingContract } from './types';
  import { CostVotingInterface } from './abi';
  export type { CostVotingContract } from './types';

  export const costVotingContract = (provider: BaseProvider) => {
    const contract = proxy<CostVotingContract>(CostVotingInterface, provider);
    return contract;
  };

  export const costVotingInfo: Contract<CostVotingContract> = {
    contract: costVotingContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/boot/cost-voting.clar',
  };
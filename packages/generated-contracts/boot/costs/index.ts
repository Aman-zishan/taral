
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { CostsContract } from './types';
  import { CostsInterface } from './abi';
  export type { CostsContract } from './types';

  export const costsContract = (provider: BaseProvider) => {
    const contract = proxy<CostsContract>(CostsInterface, provider);
    return contract;
  };

  export const costsInfo: Contract<CostsContract> = {
    contract: costsContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/boot/costs.clar',
  };
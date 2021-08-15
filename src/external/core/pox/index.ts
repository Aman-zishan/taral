
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { PoxInterface } from './abi';
import type { PoxContract } from './types';


export type { PoxContract } from './types';

export const poxContract = (provider: BaseProvider) => {
    const contract = proxy<PoxContract>(PoxInterface, provider);
    return contract;
};

export const poxInfo: Contract<PoxContract> = {
    contract: poxContract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/core/pox.clar',
};

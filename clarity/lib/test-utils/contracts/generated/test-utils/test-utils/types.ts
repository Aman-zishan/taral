import { Transaction } from "../../../../../transaction";

export interface TestUtilsContract {
  mineBlock: () => Transaction<boolean, null>;
  getBlockHeight: () => Promise<bigint>;
  getStxBalance: (account: string) => Promise<bigint>;
}

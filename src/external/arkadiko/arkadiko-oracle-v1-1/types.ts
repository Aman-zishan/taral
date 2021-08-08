import { IMetadata } from "../../../../shared/providers/types";
import { Transaction } from "../../../../shared/transaction";

// prettier-ignore

export interface ArkadikoOracleV11Contract {
    fetchPrice: (token: string, metadata: IMetadata) => Transaction<{
        "last-block": number;
        "last-price-in-cents": number
    }, null>;
    setOracleOwner: (address: string, metadata: IMetadata) => Transaction<boolean, number>;
    updatePrice: (token: string, price: number, metadata: IMetadata) => Transaction<number, number>;
    getPrice: (token: string, metadata: IMetadata) => Promise<{
        "last-block": number;
        "last-price-in-cents": number
    }>;
    ERRNOTAUTHORIZED: () => Promise<number>;
    ERRNOTWHITELISTED: () => Promise<number>;
    lastBlock: () => Promise<number>;
    lastPriceInCents: () => Promise<number>;
    oracleOwner: () => Promise<string>;
    prices: (key: {
        "token": string
    }) => Promise<{
        "last-block": number;
        "last-price-in-cents": number
    } | null>;
}

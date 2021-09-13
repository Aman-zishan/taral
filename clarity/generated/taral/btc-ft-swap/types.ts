import { ClarityTypes } from "../../../lib/clarity/types";
import { IMetadata } from "../../../lib/providers/types";
import { Transaction } from "../../../lib/transaction";

// prettier-ignore

export interface BtcFtSwapContract {
    cancel: (id: number, ft: string, metadata: IMetadata) => Transaction<boolean, number>;
    createSwap: (sats: number, btcReceiver: Buffer, amount: number, ftReceiver: string | null, ft: string, metadata: IMetadata) => Transaction<number, number>;
    getOutValue: (tx: {
        "ins": {
            "outpoint": {
                "hash": Buffer;
                "index": Buffer
            };
            "scriptSig": Buffer;
            "sequence": Buffer
        }[];
        "locktime": Buffer;
        "outs": {
            "scriptPubKey": Buffer;
            "value": Buffer
        }[];
        "version": Buffer
    }, pubscriptkey: Buffer, metadata: IMetadata) => Transaction<{
        "out": {
            "scriptPubKey": Buffer;
            "value": number
        } | null;
        "pubscriptkey": Buffer
    }, null>;
    setFtReceiver: (id: number, metadata: IMetadata) => Transaction<boolean, number>;
    submitSwap: (id: number, block: {
        "height": number;
        "merkle-root": Buffer;
        "nbits": Buffer;
        "nonce": Buffer;
        "parent": Buffer;
        "timestamp": Buffer;
        "version": Buffer
    }, tx: {
        "ins": {
            "outpoint": {
                "hash": Buffer;
                "index": Buffer
            };
            "scriptSig": Buffer;
            "sequence": Buffer
        }[];
        "locktime": Buffer;
        "outs": {
            "scriptPubKey": Buffer;
            "value": Buffer
        }[];
        "version": Buffer
    }, proof: {
        "hashes": Buffer[];
        "tree-depth": number;
        "tx-index": number
    }, ft: string, metadata: IMetadata) => Transaction<boolean, number>;
    ERR_ALREADY_DONE: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_FAILED_TO_PARSE_TX: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_INVALID_FUNGIBLE_TOKEN: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_INVALID_ID: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_NATIVE_FAILURE: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_NO_FT_RECEIVER: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_TOO_EARLY: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_TX_NOT_FOR_RECEIVER: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_TX_VALUE_TOO_SMALL: () => Promise<ClarityTypes.Response<null, number>>;
    ERR_VERIFICATION_FAILED: () => Promise<ClarityTypes.Response<null, number>>;
    expiry: () => Promise<number>;
    nextId: () => Promise<number>;
    swaps: (key: number) => Promise<{
        "amount": number;
        "btc-receiver": Buffer;
        "done": number;
        "ft": string;
        "ft-receiver": string | null;
        "ft-sender": string;
        "sats": number;
        "when": number
    } | null>;
}

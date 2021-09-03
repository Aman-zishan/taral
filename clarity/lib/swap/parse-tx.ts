import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";

export interface ParseTxRequest extends ClarityBitcoinRequest {
    txCV: Buffer;
}

export async function parseTx(request: ParseTxRequest): Promise<string> {
    let result: string = '';

    try {
        // Call readonly function
        //
        let response = await request.contract.getTxid(request.txCV, getMetadata('readonly', request));
        result = response.toString();
    } catch (e) {
        Logger.error(`parse-tx failed: ${e.toString()}`)
    }

    Logger.debug(`parse-tx result: ${result}`);

    return result;
}
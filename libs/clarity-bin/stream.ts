import * as readline from "readline";
import {
  PassThrough,
  pipeline,
  Readable,
  Writable,
  WritableOptions,
} from "stream";
import { promisify } from "util";

export const pipelineAsync = promisify(pipeline);

export class MemoryStream extends Writable {
  buffers: Buffer[] = [];
  constructor(opts?: WritableOptions) {
    super(opts);
  }
  _write(
    chunk: any,
    encoding: string,
    callback: (error?: Error | null) => void
  ): void {
    if (chunk instanceof Buffer) {
      this.buffers.push(chunk);
    } else {
      this.buffers.push(Buffer.from(chunk, encoding as any));
    }
    callback(null);
  }
  getData() {
    if (this.buffers.length === 1) {
      return this.buffers[0];
    }
    return Buffer.concat(this.buffers);
  }
}

export async function readStream(
  stream: Readable,
  ignoreErrors = false,
  monitorCallback?: (data: string) => void
): Promise<Buffer> {
  const memStream = new MemoryStream();
  async function startReadInternal() {
    const streamArr: (NodeJS.ReadableStream | NodeJS.WritableStream)[] = [
      stream,
    ];

    let passThrough: PassThrough;

    if (monitorCallback) {
      passThrough = new PassThrough();

      const readStreamLine = readline.createInterface({
        input: passThrough,
        crlfDelay: Infinity,
      });

      readStreamLine.on("line", (lineData) => {
        monitorCallback(lineData);
      });

      streamArr.push(passThrough);
    }

    streamArr.push(memStream);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await pipelineAsync(...streamArr);
  }
  if (ignoreErrors) {
    try {
      await startReadInternal();
    } catch (error) {
      console.log(`ignored readStream error: ${error}`);
    }
  } else {
    await startReadInternal();
  }
  return memStream.getData();
}

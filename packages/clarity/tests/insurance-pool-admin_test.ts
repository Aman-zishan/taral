import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
} from "../dependencies.ts";

function poxAllowContractCaller(deployer: Account, wallet: Account) {
  return Tx.contractCall(
    "ST000000000000000000002AMW42H.pox",
    "allow-contract-caller",
    [types.principal(deployer.address + ".insurance-pool-admin"), types.none()],
    wallet.address
  );
}

function poolAllowContractCaller(deployer: Account, wallet: Account) {
  return Tx.contractCall(
    "insurance-pool-admin",
    "allow-contract-caller",
    [types.principal(deployer.address + ".insurance-pool-admin")],
    wallet.address
  );
}

Clarinet.test({
  name: "Ensure that user can pay in",
  fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "insurance-pool-admin",
        "payin",
        [types.uint(1000000), types.uint(1)],
        wallet_1.address
      ),
    ]);

    assertEquals(block.height, 2);
    console.log("Block");
    console.log(JSON.stringify(block));
    block.receipts[0].result.expectOk();
  },
});

Clarinet.test({
  name: "Ensure that user can receive rewards",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let wallet_1 = accounts.get("wallet_1")!;
    let deployer = accounts.get("deployer")!;

    let block = chain.mineBlock([
      poxAllowContractCaller(deployer, wallet_1),
      poolAllowContractCaller(deployer, wallet_1),

      Tx.contractCall(
        "insurance-pool-admin",
        "delegate-stx",
        [
          types.uint(1000000),
          types.principal(deployer.address + ".insurance-pool-admin"),
          types.some(types.uint(450)),
          types.none(),
          types.tuple({ version: "0x01", hashbytes: "0x12345678901234567890" }),
          types.uint(2),
        ],
        wallet_1.address
      ),
    ]);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk();
    block.receipts[1].result.expectOk();
    (block.receipts[2].result.expectOk().expectTuple() as any)[
      "unlock-burn-height"
    ].expectUint(450);

    assertEquals(
      chain.callReadOnlyFn(
        "insurance-pool-admin",
        "get-next-cycle",
        [],
        wallet_1.address
      ).result,
      types.uint(1)
    );
    // mine through reward cycle
    chain.mineEmptyBlock(150);
    // check cycle id
    assertEquals(
      chain.callReadOnlyFn(
        "insurance-pool-admin",
        "get-next-cycle",
        [],
        wallet_1.address
      ).result,
      types.uint(2)
    );
    // payin and claim reward
    block = chain.mineBlock([
      Tx.contractCall(
        "insurance-pool-admin",
        "payin",
        [types.uint(100), types.uint(0)],
        deployer.address
      ),
      Tx.contractCall(
        "insurance-pool-admin",
        "claim-rewards",
        [types.uint(0)],
        wallet_1.address
      ),
    ]);

    assertEquals(block.height, 153);
    block.receipts[0].result.expectOk();
    assertEquals(block.receipts[1].result, "(err u0)"); // no rewards
  },
});

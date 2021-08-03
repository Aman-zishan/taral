export type CONTRACTS =
  | "simple-counter"
  | "counter"
  | "counter-coin"
  | "sip-10-ft-standard"
  | "pox"
  | 'sip-010-trait-ft-standard'
  | 'arkadiko-stake-registry-trait-v1'
  |     'arkadiko-vault-trait-v1'
  |    'arkadiko-vault-manager-trait-v1' 
  |    'arkadiko-dao-token-trait-v1'
  |    'arkadiko-oracle-trait-v1'
  |    'arkadiko-auction-engine-trait-v1' 
  |    'arkadiko-collateral-types-trait-v1' 
  |    'arkadiko-stake-pool-trait-v1'
  |    'arkadiko-collateral-types-v1-1' 
  |    'arkadiko-oracle-v1-1'
  |    'arkadiko-token'
  |    'arkadiko-dao'
  |    'arkadiko-governance-v1-1' 
  |    'arkadiko-diko-guardian-v1-1' 
  
  |     'usda-token'
  |    'xstx-token' 

  |    'arkadiko-vault-data-v1-1' 
  |    'arkadiko-vault-rewards-v1-1' 
  |    'arkadiko-stx-reserve-v1-1'
  |    'arkadiko-sip10-reserve-v1-1' 

  |    'arkadiko-stacker-v1-1'
  |    'arkadiko-freddie-v1-1' 
  |    'arkadiko-stake-registry-v1-1' 
  |    'arkadiko-stake-pool-diko-v1-1' 

  |    'arkadiko-auction-engine-v1-1' 
  |    'arkadiko-liquidator-v1-1'
  |'arkadiko-swap-token-diko-usda'
  | 'arkadiko-swap-token-wstx-usda'
  | 'arkadiko-swap-token-wstx-diko'
  | 'arkadiko-stake-pool-diko-usda-v1-1'
  | 'arkadiko-stake-pool-wstx-usda-v1-1'
  | 'arkadiko-stake-pool-wstx-diko-v1-1'
  | 'arkadiko-swap-v1-1'
  | 'arkadiko-diko-init'
  | 'wrapped-stx-token'
  | 'arkadiko-swap-trait-v1'
  | 'stdiko-token';

export const GENERATION_FOLDER = "src//";

export const contracts: CONTRACTS[] = [
  "simple-counter",
  "sip-10-ft-standard",
  "counter-coin",
  "counter",
  
  'sip-010-trait-ft-standard',
  'arkadiko-oracle-trait-v1',
  'arkadiko-collateral-types-trait-v1',

  'arkadiko-vault-trait-v1',
  'arkadiko-vault-manager-trait-v1',
  'arkadiko-dao-token-trait-v1',
  'arkadiko-auction-engine-trait-v1',
  'arkadiko-stake-registry-trait-v1',
  'arkadiko-stake-pool-trait-v1',
  'arkadiko-swap-trait-v1',

  'arkadiko-token',
  'arkadiko-dao',

  'stdiko-token',
  'arkadiko-collateral-types-v1-1',
  'arkadiko-oracle-v1-1',
  'wrapped-stx-token',
  'arkadiko-governance-v1-1',
  'arkadiko-diko-guardian-v1-1',
  'arkadiko-swap-v1-1',
  'arkadiko-diko-init',

  'usda-token',
  'xstx-token',
  'arkadiko-swap-token-diko-usda',
  'arkadiko-swap-token-wstx-usda',
  'arkadiko-swap-token-wstx-diko',

  'arkadiko-vault-data-v1-1',
  'arkadiko-vault-rewards-v1-1',
  'arkadiko-stx-reserve-v1-1',
  'arkadiko-sip10-reserve-v1-1',

  'pox',

  'arkadiko-freddie-v1-1',

  'arkadiko-stacker-v1-1',
  'arkadiko-stake-registry-v1-1',
  'arkadiko-stake-pool-diko-v1-1',
  'arkadiko-stake-pool-diko-usda-v1-1',
  'arkadiko-stake-pool-wstx-usda-v1-1',
  'arkadiko-stake-pool-wstx-diko-v1-1',

  'arkadiko-auction-engine-v1-1',
  'arkadiko-liquidator-v1-1',
];

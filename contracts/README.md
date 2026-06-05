# Move Contract Starter

This folder contains the Supra L1 Move starter scaffold for Ore Forge.

## Tokenomics summary
- Max supply: 1,000,000,000 $ORE
- Emission schedule: controlled release, with a halving cadence and DAO-adjustable cap.
- Treasury split: 40% buyback/burn, 30% staking rewards, 15% NFT evolution, 10% development/events, 5% liquidity.

## Balancing notes
- Keep boost costs low enough for F2P progression, but high enough to preserve token sink.
- Use NFT evolution and staking to reward long-term holders.
- Keep dVRF trait upgrades random but bounded so the economy remains predictable.

## Testing instructions
1. Install the Supra Move toolchain.
2. Run the Move tests and static checks in this folder.
3. Deploy to Supra testnet and validate treasury, mint, and staking flows before mainnet.

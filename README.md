# Ore Forge

A Supra L1 native idle/clicker mining game scaffold with:
- frontend/ — Next.js + Tailwind gameplay UI
- contracts/ — Move contract starter for treasury and mint logic
- scripts/ — deployment and automation notes

## Features
- Retro pixel mining loop
- Click power, passive ore generation, streaks, boosts
- StarKey connection hook for Supra-only wallet integration
- Move contract starter for treasury and emissions

## Running the frontend
cd frontend
npm install
npm run dev

## Production notes
- Replace the placeholder Move module with full Supra contract modules for NFT evolution, staking, dVRF, and AutoFi automation.
- Connect via StarKey: use window.starkey.supra in the browser.
- Deploy on Supra testnet/mainnet with the official Supra Move tooling.

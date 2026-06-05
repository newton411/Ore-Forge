'use client';

import { useEffect, useMemo, useState } from 'react';

type BoostKey = 'basic' | 'standard' | 'premium';

const BOOSTS = {
  basic: { label: 'Basic Boost', multiplier: 1.4, durationHours: 12, oreCost: 25, accent: 'from-amber-400 to-yellow-600' },
  standard: { label: 'Standard Boost', multiplier: 1.75, durationHours: 48, oreCost: 75, accent: 'from-lime-400 to-emerald-600' },
  premium: { label: 'Premium Boost', multiplier: 2.0, durationHours: 168, oreCost: 180, accent: 'from-fuchsia-400 to-violet-600' },
} as const;

export function OreForgeGame() {
  const [ore, setOre] = useState(120);
  const [clickPower, setClickPower] = useState(1);
  const [autoRate, setAutoRate] = useState(0.6);
  const [streak, setStreak] = useState(4);
  const [boost, setBoost] = useState<BoostKey | null>(null);
  const [boostExpiresAt, setBoostExpiresAt] = useState<number | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setOre((prev) => prev + autoRate * (boost ? BOOSTS[boost].multiplier : 1) * 0.25);
      if (boostExpiresAt && Date.now() > boostExpiresAt) {
        setBoost(null);
        setBoostExpiresAt(null);
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, [autoRate, boost, boostExpiresAt]);

  const effectiveMultiplier = useMemo(() => boost ? BOOSTS[boost].multiplier : 1, [boost]);

  const handleMine = () => {
    setOre((prev) => prev + clickPower * effectiveMultiplier);
    setStreak((prev) => prev + 1);
  };

  const handleUpgrade = (type: 'click' | 'auto') => {
    if (type === 'click') {
      if (ore < 50) return;
      setOre((prev) => prev - 50);
      setClickPower((prev) => prev + 1);
    } else {
      if (ore < 80) return;
      setOre((prev) => prev - 80);
      setAutoRate((prev) => prev + 0.2);
    }
  };

  const purchaseBoost = (key: BoostKey) => {
    const config = BOOSTS[key];
    if (ore < config.oreCost) return;
    setOre((prev) => prev - config.oreCost);
    setBoost(key);
    setBoostExpiresAt(Date.now() + config.durationHours * 60 * 60 * 1000);
  };

  const connectStarKey = async () => {
    const provider = (window as any).starkey?.supra;
    if (!provider) {
      alert('StarKey wallet extension is not available in this browser.');
      return;
    }
    const accounts = await provider.request({ method: 'supra_requestAccounts' });
    setWallet(accounts?.[0] ?? null);
  };

  return (
    <main className="min-h-screen px-4 py-6 text-[#fff7e7] md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="pixel-card rounded-3xl p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">Supra L1 Native</p>
          <h1 className="mt-2 text-4xl font-black text-amber-100 md:text-6xl">Ore Forge</h1>
          <p className="mt-3 max-w-2xl text-sm text-amber-100/80 md:text-base">Idle + clicker mining on Supra L1 with StarKey-only wallet support, evolving NFTs, staking, and treasury-driven tokenomics.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="pixel-card rounded-3xl p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Current Ore</p>
                <h2 className="mt-1 text-5xl font-black">{ore.toFixed(1)} $ORE</h2>
              </div>
              <button className="pixel-btn rounded-2xl px-4 py-3 text-sm" onClick={connectStarKey}>
                {wallet ? `Wallet: ${wallet.slice(0, 6)}…` : 'Connect StarKey'}
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Stat label="Click Power" value={`${clickPower} ore/click`} />
              <Stat label="Auto Rate" value={`${autoRate.toFixed(1)} ore/s`} />
              <Stat label="Streak" value={`${streak}x`} />
            </div>

            <button
              onClick={handleMine}
              className="mt-6 w-full rounded-3xl border border-amber-300/50 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-600 px-6 py-5 text-2xl font-black text-amber-950 shadow-[0_12px_0_#7b4a14] active:translate-y-1 active:shadow-[0_6px_0_#7b4a14]"
            >
              Tap to mine ORE
            </button>

            <p className="mt-4 text-sm text-amber-100/80">Boost multiplier active: {effectiveMultiplier.toFixed(2)}x • Daily streaks and treasury recycling are wired in the design docs and contract layer.</p>
          </article>

          <aside className="grid gap-6">
            <article className="pixel-card rounded-3xl p-6">
              <h3 className="text-xl font-black text-amber-100">Upgrades</h3>
              <div className="mt-4 grid gap-3">
                <UpgradeCard title="Pickaxe Upgrade" cost="50 ORE" description="+1 ore per click" onClick={() => handleUpgrade('click')} />
                <UpgradeCard title="Drill Rig" cost="80 ORE" description="+0.2 ore/sec passive rate" onClick={() => handleUpgrade('auto')} />
              </div>
            </article>

            <article className="pixel-card rounded-3xl p-6">
              <h3 className="text-xl font-black text-amber-100">Temporary Boosts</h3>
              <div className="mt-4 grid gap-3">
                {Object.entries(BOOSTS).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => purchaseBoost(key as BoostKey)}
                    className={`rounded-2xl border border-amber-300/30 bg-gradient-to-r ${config.accent} p-4 text-left text-[#1b1208]`}
                  >
                    <div className="text-sm font-black uppercase tracking-[0.2em]">{config.label}</div>
                    <div className="text-xs">{config.multiplier}x • {config.durationHours}h • Cost {config.oreCost} ORE</div>
                  </button>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="pixel-card rounded-3xl p-6">…</article>
          <article className="pixel-card rounded-3xl p-6">…</article>
          <article className="pixel-card rounded-3xl p-6">…</article>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-amber-300/20 bg-black/20 p-4">
      <div className="text-[11px] uppercase tracking-[0.35em] text-amber-100/70">{label}</div>
      <div className="mt-2 text-2xl font-black text-amber-50">{value}</div>
    </div>
  );
}

function UpgradeCard({ title, cost, description, onClick }: { title: string; cost: string; description: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="pixel-btn rounded-2xl px-4 py-3 text-left">
      <div className="text-sm font-black uppercase tracking-[0.2em]">{title}</div>
      <div className="mt-1 text-xs text-amber-100/90">{description}</div>
      <div className="mt-2 text-xs text-amber-50/90">Cost: {cost}</div>
    </button>
  );
}

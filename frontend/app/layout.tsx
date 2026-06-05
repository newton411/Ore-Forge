import './globals.css';
import { Cairo, Orbitron, Press_Start_2P } from 'next/font/google';

const cairo = Cairo({ subsets: ['latin'], variable: '--font-cairo' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const pixel = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-pixel' });

export const metadata = {
  title: 'Ore Forge | Pixel Mining Frontiers',
  description: 'A polished retro mining game with treasury, boosts, and StarKey-ready gameplay for Vercel deployment.',
  metadataBase: new URL('https://ore-forge.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cairo.variable} ${orbitron.variable} ${pixel.variable}`}>
      <body className="min-h-screen bg-black text-[#fff7e7] antialiased">{children}</body>
    </html>
  );
}

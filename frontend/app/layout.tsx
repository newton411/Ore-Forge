import './globals.css';

export const metadata = {
  title: 'Ore Forge',
  description: 'Supra L1 native idle/clicker mining game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

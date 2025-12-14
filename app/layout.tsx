// app/layout.tsx
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: '#050505', color: '#ffffff' }}
        className="min-h-screen bg-[#050505] text-white font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
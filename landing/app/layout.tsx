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
        style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', margin: 0, fontFamily: 'sans-serif' }}
        className="min-h-screen bg-[#050505] text-white font-sans antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
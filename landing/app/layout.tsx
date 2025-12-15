import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <base href="/" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
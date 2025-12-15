import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <base href="/" />
      </head>
      <body style={{ backgroundColor: '#050505', color: '#fff', margin: 0 }}>{children}</body>
    </html>
  );
}
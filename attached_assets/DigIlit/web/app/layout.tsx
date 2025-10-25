import './globals.css';

export const metadata = {
  title: 'Diglit',
  description: 'Your Vision + Our Mission = Hegemony'
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#0f172a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
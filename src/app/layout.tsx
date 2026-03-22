
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Plus_Jakarta_Sans, Syne, Unbounded, Anton } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothScroll } from '@/components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Cotton Root | Strategic Apparel Sourcing Partner",
  description: 'Cotton Root is your premier apparel sourcing partner in Pakistan, providing end-to-end supply chain management and multi-market export expertise.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth scroll-pt-28 ${inter.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${syne.variable} ${unbounded.variable} ${anton.variable}`}>
      <body className="font-body antialiased selection:bg-accent/30 bg-background text-foreground overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScroll>
            {/* Global Optimized Background */}
            <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-background">
              <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.1] gpu-accelerated">
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-primary/10 blur-[80px] rounded-full hidden md:block" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-accent/10 blur-[80px] rounded-full" />
              </div>
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {children}
            <CustomCursor />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

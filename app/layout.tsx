import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies, draftMode } from 'next/headers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = draftMode();

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {isEnabled && (
          <div className="absolute right-4 bottom-4">
            Draft mode ({cookies().get('ks-branch')?.value})
            <form method="POST" action="/preview/end">
              <button className="underline">End preview</button>
            </form>
          </div>
        )}
      </body>
    </html>
  );
}

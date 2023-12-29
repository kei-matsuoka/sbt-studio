import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import WalletProvider from '@/components/WalletProvider';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Container from '@/components/Container';
import GraphqlProvider from '@/components/GraphqlProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SBT Studio',
  description:
    'Web3のデジタル会員証を発行・管理するためのアプリです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <WalletProvider>
          <GraphqlProvider>
            <Header />
            <Sidebar />
            <Container>{children}</Container>
          </GraphqlProvider>
        </WalletProvider>
      </body>
    </html>
  );
}

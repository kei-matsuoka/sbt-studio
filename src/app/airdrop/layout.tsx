'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function AirdropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address } = useAccount();

  useEffect(() => {
    if (!address) {
      redirect('/');
    }
  }, [address]);

  return <>{children}</>;
}

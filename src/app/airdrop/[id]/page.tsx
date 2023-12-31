'use client';

import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import ConfirmTokenForm from '@/components/ConfirmTokenForm';
import { tokenConfig } from '@/constants';

export default function AirdropType() {
  const { id } = useParams();

  const tokenName = tokenConfig.find((token) => token.id === id)?.name;
  const interfaceId = tokenConfig.find((token) => token.id === id)?.interfaceId;

  useEffect(() => {
    if (!tokenName) {
      redirect('/airdrop');
    }
  }, [tokenName]);

  return (
    <>
      <PageTitle title={tokenName || 'Token Type'} />
      <ConfirmTokenForm tokenName={tokenName} interfaceId={interfaceId} />
    </>
  );
}

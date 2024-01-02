'use client';

import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import PageTitle from '@/components/PageTitle';
import AirdropERC20Form from '@/components/forms/AirdropERC20Form';
import AirdropERC721Form from '@/components/forms/AirdropERC721Form';
import { tokenConfig } from '@/constants';
import { GET_CREATED_TOKENS } from '@/queries';

export default function AirdropType() {
  const { id } = useParams();
  const tokenName = tokenConfig.find((token) => token.id === id)?.name;

  const { address } = useAccount();
  const creatorId = address?.toLowerCase();
  const { loading, error, data } = useQuery(GET_CREATED_TOKENS, {
    variables: { creatorId },
  });

  useEffect(() => {
    if (!tokenName) {
      redirect('/airdrop');
    }
  }, [tokenName]);

  return (
    <>
      <PageTitle title={`Airdrop ${tokenName}` || 'Airdrop Token'} />
      {id === 'erc20' && <AirdropERC20Form tokens={data?.creator?.tokens} />}
      {id === 'erc721' && <AirdropERC721Form tokens={data?.creator?.tokens} />}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import SubTitle from '@/components/SubTitle';
import StatCard from '@/components/StatCard';
import HorizontalCard from '@/components/HorizontalCard';
import Landing from '@/components/Landing';
import { quickLinks } from '@/constants';
import { GET_CREATED_TOKENS } from '@/queries';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [account, setAccount] = useState<`0x${string}` | undefined>();
  const [createdTokens, setCreatedTokens] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [totalHolders, setTotalHolders] = useState(0);

  const { address } = useAccount();
  const creatorId = address?.toLowerCase();
  const { error, data } = useQuery(GET_CREATED_TOKENS, {
    variables: { creatorId },
  });

  useEffect(() => {
    setAccount(address);
  }, [address]);

  useEffect(() => {
    setCreatedTokens(data?.creator?.tokens.length);

    let totalSupply = 0;
    data?.creator?.tokens.map((token: any) => {
      totalSupply += token.mintedTokens.length;
    });
    setTotalSupply(totalSupply);

    let totalHolders = 0;
    data?.creator?.tokens.map((token: any) => {
      token.mintedTokens.map((mintedToken: any) => {
        if (!mintedToken.isBurned) {
          totalHolders++;
        }
      });
    });
    setTotalHolders(totalHolders);
  }, [data]);

  return (
    <>
      {account ? (
        <>
          <SubTitle title="Overview" />
          {error && <ErrorMessage message={error?.message} />}
          <div className="mb-6 flex flex-row gap-4">
            <StatCard title="Created Tokens" value={createdTokens || 0} />
            <StatCard title="Total Supply" value={totalSupply || 0} />
            <StatCard title="Total Holders" value={totalHolders || 0} />
          </div>
          <SubTitle title="Quick Access" />
          <div className="flex flex-col gap-4">
            {quickLinks.map((link) => (
              <HorizontalCard
                key={link.title}
                href={link.href}
                src={link.src}
                alt={link.alt}
                title={link.title}
                description={link.description}
              />
            ))}
          </div>
        </>
      ) : (
        <Landing />
      )}
    </>
  );
}

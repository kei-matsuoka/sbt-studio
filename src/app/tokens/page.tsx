'use client';

import { useQuery } from '@apollo/client';
import { useAccount } from 'wagmi';
import Card from '@/components/Card';
import { GET_CREATED_TOKENS } from '../../queries';
import { Token } from '@/types';
import PageTitle from '@/components/PageTitle';

export default function Tokens() {
  const { address } = useAccount();
  const creatorId = address?.toLowerCase();
  const { loading, error, data } = useQuery(GET_CREATED_TOKENS, {
    variables: { creatorId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <>
      <PageTitle title="Tokens" />
      <div className="flex flex-wrap gap-3">
        {data?.creator?.tokens.map((token: Token) => (
          <Card token={token} key={token.id} />
        ))}
      </div>
    </>
  );
}

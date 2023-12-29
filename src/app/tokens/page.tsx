'use client';

import { useQuery } from '@apollo/client';
import { GET_CREATED_TOKENS } from '../../queries';
import Image from 'next/image';
import { useAccount } from 'wagmi';

type Token = {
  id: string;
  name: string;
  symbol: string;
  imageURI: string;
  description: string;
  createdAtTimestamp: string;
};

export default function Tokens() {
  const { address } = useAccount();
  const creatorId = address?.toLowerCase();
  const { loading, error, data } = useQuery(GET_CREATED_TOKENS, {
    variables: { creatorId },
  });
  console.log('tokens:', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <h1>会員証一覧</h1>
      <ul className="">
        {data?.creator?.tokens.map((token: Token) => (
          <li
            key={token.id}
            className="bg-white rounded-lg p-6 my-6 shadow w-fit"
          >
            <Image
              src={token.imageURI}
              alt={token.name}
              width={320}
              height={180}
            />
            <p>
              {token.name} - {token.symbol}
            </p>
            <p>{token.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

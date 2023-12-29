'use client';

import { useQuery } from '@apollo/client';
import { useAccount } from 'wagmi';
import Card from '@/components/Card';
import { GET_CREATED_TOKENS } from '../../queries';
import { Token } from '@/types';

export default function Tokens() {
  const { address } = useAccount();
  const creatorId = address?.toLowerCase();
  const { loading, error, data } = useQuery(GET_CREATED_TOKENS, {
    variables: { creatorId },
  });

  const tokens = [
    {
      id: '1',
      name: '会員証1',
      symbol: 'MEMBERSHIP1',
      imageURI: 'https://placehold.jp/320x180.png',
      description: '会員証1の説明',
      createdAtTimestamp: '2021-10-01T00:00:00.000Z',
    },
    {
      id: '2',
      name: '会員証2',
      symbol: 'MEMBERSHIP2',
      imageURI: 'https://placehold.jp/320x180.png',
      description: '会員証2の説明',
      createdAtTimestamp: '2021-10-02T00:00:00.000Z',
    },
    {
      id: '3',
      name: '会員証3',
      symbol: 'MEMBERSHIP3',
      imageURI: 'https://placehold.jp/320x180.png',
      description: '会員証3の説明',
      createdAtTimestamp: '2021-10-03T00:00:00.000Z',
    },
    {
      id: '4',
      name: '会員証4',
      symbol: 'MEMBERSHIP4',
      imageURI: 'https://placehold.jp/320x180.png',
      description: '会員証4の説明',
      createdAtTimestamp: '2021-10-04T00:00:00.000Z',
    },
    {
      id: '5',
      name: '会員証5',
      symbol: 'MEMBERSHIP5',
      imageURI: 'https://placehold.jp/320x180.png',
      description: '会員証5の説明',
      createdAtTimestamp: '2021-10-05T00:00:00.000Z',
    },
    {
      id: '6',
      name: '会員証6',
      symbol: 'MEMBERSHIP6',
      imageURI: 'https://placehold.jp/320x180.png',
      description: '会員証6の説明',
      createdAtTimestamp: '2021-10-06T00:00:00.000Z',
    },
    {
      id: '7',
      name: '会員証7',
      symbol: 'MEMBERSHIP7',
      imageURI: 'https://placehold.jp/320x180.png',
      description: '会員証7の説明',
      createdAtTimestamp: '2021-10-07T00:00:00.000Z',
    },
    {
      id: '8',
      name: '会員証8',
      symbol: 'MEMBERSHIP8',
      imageURI: 'https://placehold.jp/320x180.png',
      description: '会員証8の説明',
      createdAtTimestamp: '2021-10-08T00:00:00.000Z',
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <h1>会員証一覧</h1>
      <div className="flex flex-wrap gap-3">
        {data?.creator?.tokens.map((token: Token) => (
          <Card token={token} key={token.id} />
        ))}
        {/* {tokens.map((token: Token) => (
          <Card token={token} key={token.id} />
        ))} */}
      </div>
    </div>
  );
}

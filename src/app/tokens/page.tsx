'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import PageTitle from '@/components/PageTitle';
import SearchInput from '@/components/SearchInput';
import Card from '@/components/Card';
import CardPlaceholder from '@/components/CardPlaceholder';
import LinkButton from '@/components/LinkButton';
import Plus from '@/components/icons/Plus';
import { GET_CREATED_TOKENS } from '@/queries';
import { Token } from '@/types';

export default function Tokens() {
  const [searchQuery, setSearchQuery] = useState('');
  const { address } = useAccount();
  const creatorId = address?.toLowerCase();
  const { loading, error, data } = useQuery(GET_CREATED_TOKENS, {
    variables: { creatorId },
  });

  const filteredTokens = data?.creator?.tokens.filter((token: Token) => {
    return token.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (error) return <p>Error</p>;

  return (
    <>
      <PageTitle title="Tokens" />
      <div className="flex justify-between items-center mb-8">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <LinkButton href="/tokens/create" text="Create Token">
          <Plus />
        </LinkButton>
      </div>
      <div className="flex flex-wrap gap-3">
        {loading
          ? [...Array(9)].map((_, i) => <CardPlaceholder key={i} />)
          : filteredTokens
          ? filteredTokens.map((token: Token) => (
              <Card page="tokens" token={token} key={token.id} />
            ))
          : 'Data not found'}
      </div>
    </>
  );
}

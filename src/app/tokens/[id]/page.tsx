'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import PageTitle from '@/components/PageTitle';
import SearchInput from '@/components/SearchInput';
import LinkButton from '@/components/LinkButton';
import TokenTable from '@/components/TokenTable';
import { GET_CREATED_TOKEN } from '../../../queries';
import { formatMintedTokens } from '@/utils/token';
import Modal from '@/components/Modal';
import MintForm from '@/components/MintForm';
import ModalButton from '@/components/ModalButton';
import TokenTablePlaceholder from '@/components/TokenTablePlaceholder';

export default function Token() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const tokenId = id?.toLowerCase();
  const { loading, error, data } = useQuery(GET_CREATED_TOKEN, {
    variables: { tokenId },
  });

  const formattedTokens = data
    ? formatMintedTokens(data.createdToken.mintedTokens)
    : [];

  const filteredTokens = formattedTokens.filter(
    (token) =>
      token.tokenId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.formattedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (token.minter &&
        token.minter.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <PageTitle title={data ? data.createdToken.name : 'Token Detail'} />

      <div className="flex justify-between items-center mb-8">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ModalButton
          text="Mint Token"
          handleOnClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>

      {loading ? (
        <TokenTablePlaceholder />
      ) : (
        <TokenTable tokens={filteredTokens} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(!isModalOpen)}>
          <MintForm
            tokenId={tokenId}
            onClose={() => setIsModalOpen(!isModalOpen)}
          />
        </Modal>
      )}
    </>
  );
}

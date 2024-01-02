'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useQuery } from '@apollo/client';
import PageTitle from '@/components/PageTitle';
import SearchInput from '@/components/SearchInput';
import TokenTable from '@/components/TokenTable';
import { GET_CREATED_TOKEN } from '../../../queries';
import { formatCreatedToken, formatMintedTokens } from '@/utils/token';
import Modal from '@/components/Modal';
import MintForm from '@/components/forms/MintForm';
import ModalButton from '@/components/ModalButton';
import TokenTablePlaceholder from '@/components/TokenTablePlaceholder';
import TokenDetail from '@/components/TokenDetail';
import TokenDetailPlaceholder from '@/components/TokenDetailPlaceholder';
import MembershipSBTJson from '@/abis/MembershipSBT.json';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

export default function Token() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const tokenId = id?.toLowerCase();
  const { loading, error, data } = useQuery(GET_CREATED_TOKEN, {
    variables: { tokenId },
  });

  const {
    data: burnData,
    isError,
    isLoading,
    write,
  } = useContractWrite({
    address: tokenId as `0x${string}`,
    abi: MembershipSBTJson.abi,
    functionName: 'burn',
  });

  const {
    data: txData,
    isError: txIsError,
    isLoading: txIsLoading,
  } = useWaitForTransaction({
    hash: burnData?.hash,
  });

  const handleBurn = (tokenId: number) => {
    write({
      args: [tokenId],
    });
  };

  const formattedTokens = data
    ? formatMintedTokens(data.createdToken.mintedTokens)
    : [];

  const filteredTokens = formattedTokens.filter(
    (token) =>
      String(token.tokenId).includes(searchQuery.toLowerCase()) ||
      token.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.formattedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (token.minter &&
        token.minter.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formattedToken = data
    ? formatCreatedToken(data.createdToken)
    : undefined;

  return (
    <>
      <PageTitle title={data ? data.createdToken.name : 'Token Detail'} />

      {loading || !formattedToken ? (
        <TokenDetailPlaceholder />
      ) : (
        <TokenDetail token={formattedToken} />
      )}

      <div className="flex justify-between items-center mb-4">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ModalButton
          text="Mint Token"
          handleOnClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>

      {(isLoading || txIsLoading) && <Loader />}
      {(error || isError || txIsError) && <ErrorMessage message="Error" />}

      {loading || !filteredTokens ? (
        <TokenTablePlaceholder />
      ) : (
        <TokenTable
          tokens={filteredTokens}
          burnAuth={data.createdToken.burnAuth}
          handleBurn={handleBurn}
        />
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

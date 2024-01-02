'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import ContractAddress from '../inputs/ContractAddress';
import From from '../inputs/From';
import To from '../inputs/To';
import TokenId from '../inputs/TokenId';
import SubmitButton from '../SubmitButton';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { useAirdropERC721 } from '@/hooks';
import { Token } from '@/types';

type Inputs = {
  contractAddress: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}`;
  tokenId: number;
};

export default function AirdropERC721Form({ tokens }: { tokens: Token[] }) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { address } = useAccount();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      from: address,
      tokenId: 0,
    },
  });

  const contractAddress = watch('contractAddress');
  const tokenId = watch('tokenId');
  const { balanceOf, getApproved, safeTransferFrom } = useAirdropERC721(
    contractAddress,
    tokenId
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (balanceOf.isError || getApproved.isError) {
      setErrorMessage('This Contract is not ERC721 or TokenId is invalid');
      return;
    }
    if (data.from.toLocaleLowerCase() !== address) {
      if ((balanceOf.data as any) < 1) {
        setErrorMessage('Insufficient balance');
        return;
      } else {
        safeTransferFrom.write({ args: [data.from, data.to, data.tokenId] });
      }
    } else {
      const approvedAddress = String(getApproved.data).toLowerCase();
      if (approvedAddress !== address) {
        setErrorMessage('This Token is not approved');
        return;
      }
      safeTransferFrom.write({ args: [data.from, data.to, data.tokenId] });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <ContractAddress register={register} errors={errors} />
      <From register={register} errors={errors} />
      <To
        register={register}
        errors={errors}
        tokens={tokens}
        selectedToken={selectedToken}
        dropdownIsOpen={dropdownIsOpen}
        setDropdownIsOpen={setDropdownIsOpen}
        setSelectedToken={setSelectedToken}
      />
      <TokenId register={register} errors={errors} />

      {/* Submit Button */}
      <div className="flex flex-col items-center">
        <SubmitButton text="Airdrop" />
        {(balanceOf.isLoading ||
          getApproved.isLoading ||
          safeTransferFrom.isLoading) && <Loader />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {safeTransferFrom.isError && <ErrorMessage message="Error" />}
      </div>
    </form>
  );
}

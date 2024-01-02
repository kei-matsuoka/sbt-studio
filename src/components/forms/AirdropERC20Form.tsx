'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { parseEther } from 'viem';
import ContractAddress from '../inputs/ContractAddress';
import From from '../inputs/From';
import To from '../inputs/To';
import Amount from '../inputs/Amount';
import SubmitButton from '../SubmitButton';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { useAirdropERC20 } from '@/hooks';
import { Token } from '@/types';

type Inputs = {
  contractAddress: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}`;
  amount: number;
};

export default function AirdropERC20Form({ tokens }: { tokens: Token[] }) {
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
      amount: 0,
    },
  });

  const contractAddress = watch('contractAddress');
  const from = watch('from');
  const { balanceOf, allowance, transfer, transferFrom } = useAirdropERC20(
    contractAddress,
    from
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (balanceOf.isError || allowance.isError) {
      setErrorMessage('This Contract is not ERC20');
      return;
    }
    const amount = parseEther(data.amount.toString());
    if (data.from.toLocaleLowerCase() !== address) {
      if ((balanceOf.data as any) < amount) {
        setErrorMessage('Insufficient balance');
        return;
      } else {
        transfer.write({ args: [data.to, amount] });
      }
    } else {
      if ((allowance.data as any) < amount) {
        setErrorMessage('Insufficient allowance');
        return;
      }
      transferFrom.write({ args: [data.from, data.to, amount] });
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
      <Amount register={register} errors={errors} />

      {/* Submit Button */}
      <div className="flex flex-col items-center">
        <SubmitButton text="Airdrop" />
        {(balanceOf.isLoading ||
          allowance.isLoading ||
          transfer.isLoading ||
          transferFrom.isLoading) && <Loader />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {(transfer.isError || transferFrom.isError) && (
          <ErrorMessage message="Error" />
        )}
      </div>
    </form>
  );
}

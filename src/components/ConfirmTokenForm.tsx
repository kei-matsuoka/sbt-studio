'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContractRead } from 'wagmi';
import { isAddress } from 'viem';
import SubmitButton from './SubmitButton';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import ERC165Json from '@/abis/ERC165.json';

type Inputs = {
  address: `0x${string}`;
};

export default function ConfirmTokenForm({
  tokenName,
  interfaceId,
}: {
  tokenName: string | undefined;
  interfaceId: string | undefined;
}) {
  const [address, setAddress] = useState<`0x${string}` | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setAddress(formData.address);
  };

  const { data, isError, isLoading } = useContractRead({
    address: address,
    abi: ERC165Json.abi,
    functionName: 'supportsInterface',
    args: [interfaceId],
  });

  useEffect(() => {
    if (data) {
      redirect('/airdrop');
    }
  }, [data]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        {/* Address */}
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contract Address(Required)
          </label>
          <input
            {...register('address', {
              required: 'Contract Address is required',
              validate: (value) => {
                return isAddress(value) || 'Invalid Contract Address';
              },
            })}
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0x..."
          />
          {errors.address && <ErrorMessage message={errors.address.message} />}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center">
          <SubmitButton text="Next Step" />
          {isLoading && <Loader />}
          {isError && <ErrorMessage message="Error Occured" />}
          {data === false && (
            <ErrorMessage
              message={`This contract is not ${tokenName} or not support ERC165`}
            />
          )}
        </div>
      </form>
    </>
  );
}

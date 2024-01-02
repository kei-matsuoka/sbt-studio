'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import SBTFactoryJson from '../../abis/SBTFactory.json';
import Dropzone from '../Dropzone';
import { parseEther } from 'viem';
import { uploadImage, uploadJSON } from '@/utils/pinata';
import { createMetadata } from '@/utils/common';
import SubmitButton from '../SubmitButton';

type Inputs = {
  name: string;
  symbol: string;
  maxSupply: number;
  defaultBurnAuth: number;
  description: string;
  imageFile: FileList;
};

export default function MembershipForm() {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const { data, isError, write } = useContractWrite({
    address: '0xb264Da2E6E7cDbc5d9Ad9C57562acc618fc78190',
    abi: SBTFactoryJson.abi,
    functionName: 'createMembershipSBT',
    value: parseEther('0.01'),
  });

  const { data: txData } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleOnChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setSrc(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const symbol = 'SBT';
      const maxSupply = data.maxSupply || 0;

      if (!file) throw new Error('Image file is required');

      const imageURI = await uploadImage(file);
      if (!imageURI) throw new Error('Upload image failed');

      const metadata = createMetadata(data.name, imageURI, data.description);
      const jsonURI = await uploadJSON(metadata);
      if (!jsonURI) throw new Error('Upload JSON failed');

      const baseURI = jsonURI + '/';
      console.log(baseURI);

      write({
        args: [
          data.name,
          symbol,
          baseURI,
          maxSupply,
          data.defaultBurnAuth,
          imageURI,
          data.description,
        ],
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // txDataが存在したらデータをリセットしてローディングを終了する
  useEffect(() => {
    if (txData) {
      reset();
      setFile(undefined);
      setSrc('');
      setIsLoading(false);
      router.push('/tokens');
    }
  }, [txData]);

  // エラーが発生したらローディングを終了する
  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
  }, [isError]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name(Required)
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fitness Gym Membership"
          />
          {errors.name && <ErrorMessage message={errors.name.message} />}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description(Required)
          </label>
          <textarea
            {...register('description', {
              required: 'Description is required',
            })}
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="This is a membership token for the Fitness Gym. It is a soul-bound token (SBT) that can be used to redeem a 1 year membership at the Fitness Gym."
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
        </div>

        {/* Image File */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Image File(Required)
          </label>
          <div className="flex items-center justify-center">
            <label
              htmlFor="imageFile"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {!file ? (
                <Dropzone />
              ) : (
                <div className="flex items-center justify-center w-full">
                  <Image src={src} alt="image" width={320} height={180} />
                </div>
              )}
              <input
                {...register('imageFile', {
                  required: 'Image file is required',
                })}
                type="file"
                id="imageFile"
                className="hidden"
                onChange={handleOnChange}
              />
            </label>
          </div>
          {errors.imageFile && (
            <ErrorMessage message={errors.imageFile.message} />
          )}
        </div>

        {/* Max Supply */}
        <div className="mb-6">
          <label
            htmlFor="maxSupply"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Max Supply
          </label>
          <input
            {...register('maxSupply')}
            type="number"
            id="maxSupply"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="100"
          />
        </div>

        {/* Burn Auth */}
        <div className="mb-6">
          <label
            htmlFor="defaultBurnAuth"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Burn Auth(Required)
          </label>
          <select
            id="defaultBurnAuth"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('defaultBurnAuth', {
              required: 'Burn Auth is required',
            })}
          >
            <option value="" disabled selected>
              Choose Burn Auth
            </option>
            <option value={0}>Issuer Only</option>
            <option value={1}>Owner Only</option>
            <option value={2}>Both</option>
            <option value={3}>Neither</option>
          </select>
          {errors.defaultBurnAuth && (
            <ErrorMessage message={errors.defaultBurnAuth.message} />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center">
          <SubmitButton text="Create Token" />
          {isLoading && <Loader />}
          {isError && <ErrorMessage message="Error" />}
        </div>
      </form>
    </>
  );
}

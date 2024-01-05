'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import Name from '../inputs/Name';
import Description from '../inputs/Description';
import ImageFile from '../inputs/ImageFile';
import MaxSupply from '../inputs/MaxSupply';
import BurnAuth from '../inputs/BurnAuth';
import SubmitButton from '../SubmitButton';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import SBTFactoryJson from '../../abis/SBTFactory.json';
import { parseEther } from 'viem';
import { uploadImage, uploadJSON } from '@/utils/pinata';
import { createMetadata } from '@/utils/common';

type Inputs = {
  name: string;
  symbol: string;
  maxSupply: number;
  defaultBurnAuth: number;
  description: string;
  imageFile: FileList;
};

export default function CreateForm() {
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
        <Name register={register} errors={errors} />
        <Description register={register} errors={errors} />
        <ImageFile
          register={register}
          errors={errors}
          file={file}
          src={src}
          handleOnChange={handleOnChange}
        />
        <MaxSupply register={register} />
        <BurnAuth register={register} errors={errors} />

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

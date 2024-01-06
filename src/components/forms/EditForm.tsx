'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useQuery } from '@apollo/client';
import MembershipSBTJson from '@/abis/MembershipSBT.json';
import EditName from '../inputs/EditName';
import Description from '../inputs/Description';
import EditImageFile from '../inputs/EditImageFile';
import MaxSupply from '../inputs/MaxSupply';
import BurnAuth from '../inputs/BurnAuth';
import SubmitButton from '../SubmitButton';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import { uploadImage, uploadJSON } from '@/utils/pinata';
import { createMetadata } from '@/utils/common';
import { GET_CREATED_TOKEN } from '@/queries';

type Inputs = {
  name: string;
  maxSupply: number;
  defaultBurnAuth: number;
  description: string;
  imageFile: FileList;
};

export default function EditForm() {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const tokenId = id?.toLowerCase();

  // tokenの情報を取得してdefault値に設定する
  const query = useQuery(GET_CREATED_TOKEN, {
    variables: { tokenId },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const { data, isError, write } = useContractWrite({
    address: tokenId as `0x${string}`,
    abi: MembershipSBTJson.abi,
    functionName: 'setAll',
  });

  const { data: txData } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleOnChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setSrc(URL.createObjectURL(file));
    console.log('src', src);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // 何も変更されていなければエラーを表示する
    if (
      !file &&
      query.data?.createdToken.maxSupply === data.maxSupply &&
      query.data?.createdToken.burnAuth === data.defaultBurnAuth &&
      query.data?.createdToken.description === data.description
    ) {
      setErrorMessage('No changes');
      return;
    }

    setIsLoading(true);
    try {
      const maxSupply = data.maxSupply || 0;
      let imageURI = query.data?.createdToken.imageURI;
      let baseURI = query.data?.createdToken.baseURI;

      // 画像に変更があればアップロードする
      if (file) {
        imageURI = await uploadImage(file);
        if (!imageURI) throw new Error('Upload image failed');
      }

      // Metadataに変更があればJSONをアップロードする
      if (file || query.data?.createdToken.description !== data.description) {
        const metadata = createMetadata(data.name, imageURI, data.description);
        const jsonURI = await uploadJSON(metadata);
        if (!jsonURI) throw new Error('Upload JSON failed');

        const baseURI = jsonURI + '/';
        console.log(baseURI);
      }

      // 新たなset関数を作成 //変更あるものだけsetし直す
      write({
        args: [
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

  // 初期値を設定する
  useEffect(() => {
    if (query.data) {
      setValue('name', query.data.createdToken.name);
      setValue('description', query.data.createdToken.description);
      setValue('maxSupply', query.data.createdToken.maxSupply);
      setValue('defaultBurnAuth', query.data.createdToken.burnAuth);
    }
  }, [query.data]);

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
        <EditName register={register} />
        <Description register={register} errors={errors} />
        <EditImageFile
          register={register}
          src={src || query.data?.createdToken.imageURI}
          handleOnChange={handleOnChange}
        />
        <MaxSupply register={register} />
        <BurnAuth register={register} errors={errors} />

        {/* Submit Button */}
        <div className="flex flex-col items-center">
          <SubmitButton text="Create Token" />
          {(isLoading || query.loading) && <Loader />}
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {(isError || query.error) && <ErrorMessage message="Error" />}
        </div>
      </form>
    </>
  );
}

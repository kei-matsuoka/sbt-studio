'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContractWrite, useContractEvent } from 'wagmi';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import SBTFactoryJson from '../abis/SBTFactory.json';
import Dropzone from './Dropzone';
import Modal from './Modal';
import { parseEther } from 'viem';

type Inputs = {
  name: string;
  symbol: string;
  description: string;
  imageFile: FileList;
};

type ModalData = {
  creator: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  sbtAddress: string;
} | null;

export default function MembershipForm() {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState<ModalData>(null);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const { data, isError, write } = useContractWrite({
    address: '0x8EeD5Dac18AAbCA1AD12e2f4DDc50C57602a68ff',
    abi: SBTFactoryJson.abi,
    functionName: 'createMembershipSBT',
    value: parseEther('0.01'),
  });

  useContractEvent({
    address: '0x8EeD5Dac18AAbCA1AD12e2f4DDc50C57602a68ff',
    abi: SBTFactoryJson.abi,
    eventName: 'SBTCreated',
    listener(eventData: any) {
      setIsLoading(false);
      setModalData(eventData[0].args);
      setShowModal(true);
    },
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
      // if (!file) throw new Error('ファイルが選択されていません');
      // const imageURI = await uploadImage(file);
      // if (!imageURI) throw new Error('画像のアップロードに失敗しました');

      // // const metadata = createMetadata(data.name, imageURI, data.description);
      // const metadata = createMetadata(
      //   'Fitness Gym Membership',
      //   imageURI,
      //   'This is a membership token for the Fitness Gym. It is a soul-bound token (SBT) that can be used to redeem a 1 year membership at the Fitness Gym.'
      // );
      // const jsonURI = await uploadJSON(metadata);
      // if (!jsonURI) throw new Error('メタデータのアップロードに失敗しました');

      // const baseURI = jsonURI + '/';
      // console.log(baseURI);
      write({
        // args: [data.name, data.symbol, baseURI, imageURI, data.description],
        args: [
          'Fitness Gym Membership',
          'FGM',
          'https://ipfs.io/ipfs/QmPccQEHMtSV1T9kFYFCr8Udev6pBqwfT9xpyexEmA6RWv/',
          100,
          0,
          'https://ipfs.io/ipfs/QmWU8qrJm4ByGdSSyoaqvG4YbzAm4EZFHQG7L7LLCVfwvM',
          'This is a membership token for the Fitness Gym. It is a soul-bound token (SBT) that can be used to redeem a 1 year membership at the Fitness Gym.',
        ],
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    reset();
    setFile(undefined);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* 名前 */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            名前
          </label>
          <input
            {...register('name', { required: '名前は必須です' })}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fitness Gym Membership"
          />
          {errors.name && <ErrorMessage message={errors.name.message} />}
        </div>

        {/* シンボル */}
        <div className="mb-6">
          <label
            htmlFor="symbol"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            シンボル
          </label>
          <input
            {...register('symbol', { required: 'シンボルは必須です' })}
            type="text"
            id="symbol"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="FGM"
          />
          {errors.symbol && <ErrorMessage message={errors.symbol.message} />}
        </div>

        {/* 説明 */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            説明
          </label>
          <textarea
            {...register('description', { required: '説明は必須です' })}
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="This is a membership token for the Fitness Gym. It is a soul-bound token (SBT) that can be used to redeem a 1 year membership at the Fitness Gym."
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
        </div>

        {/* 画像ファイル */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            画像ファイル
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
                  required: '画像ファイルは必須です',
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

        {/* 送信ボタン */}
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 duration-100"
          >
            会員証を作成する
          </button>
          {isLoading && <Loader />}
          {isError && <ErrorMessage message="エラーが発生しました" />}
        </div>
      </form>
      {/* モーダル */}
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(!showModal);
            setSrc('');
          }}
        >
          <div
            className="bg-white px-6 py-8 rounded-xl border"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt="image" width={320} height={180} />
            <p>名前: {modalData?.name}</p>
            <p>シンボル: {modalData?.symbol}</p>
            <p>説明: {modalData?.description}</p>
            <p>アドレス: {modalData?.sbtAddress}</p>
            <a
              href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              トランザクション
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}

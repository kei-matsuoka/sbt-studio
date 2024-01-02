'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { isAddress } from 'viem';
import PageTitle from '../PageTitle';
import SubmitButton from '../SubmitButton';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import MembershipSBTJson from '@/abis/MembershipSBT.json';

type Inputs = {
  receipients: string;
};

export default function MiniForm({
  tokenId,
  onClose,
}: {
  tokenId: string;
  onClose: () => void;
}) {
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const { data, isError, isLoading, write } = useContractWrite({
    address: tokenId as `0x${string}`,
    abi: MembershipSBTJson.abi,
    functionName: 'safeMintBatch',
  });

  const {
    data: txData,
    isError: txIsError,
    isLoading: txIsLoading,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  // タグを削除する
  const handleDeleteTag = (index: number) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  // Keyが押された時の処理
  const handleKeyDown = (e: any) => {
    // Backspaceが押されたら最後のタグを削除する
    if (e.key === 'Backspace' && e.currentTarget.value === '') {
      handleDeleteTag(tags.length - 1);
    }
    // Enterが押されてもタグに追加しない
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // inputに値が入ったらタグに追加する
  const handleOnChange = (e: any) => {
    const values = e.currentTarget.value.split(/[\s,]+/).filter(Boolean);
    // アドレスを小文字に変換
    values.map((value: string) => value.toLowerCase());
    // 被っているvalueを削除
    const filteredValues = values.filter(
      (value: string, index: number, self: string) =>
        self.indexOf(value) === index
    );
    // addressが有効かつ既存のタグに含まれていないものを抽出
    const newTags = filteredValues.filter(
      (address: string) => isAddress(address) && !tags.includes(address)
    );
    // newTagsがあればタグに追加してvalueをリセット
    if (newTags.length > 0) {
      setTags([...tags, ...newTags]);
      e.currentTarget.value = '';
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async () => {
    write({
      args: [tags],
    });
  };

  // tagsが変更されたら再度validateする
  useEffect(() => {
    trigger('receipients');
  }, [tags]);

  // txDataが存在したらモーダルを閉じてtagsをリセットする
  useEffect(() => {
    if (txData) {
      setTags([]);
      onClose();
    }
  }, [txData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border px-6 py-8 rounded-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <PageTitle title="Mint Token" />
      <label
        htmlFor="receipients"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Receipients(Required)
      </label>
      <div className="flex flex-wrap text-gray-900 border w-[420px] gap-1 bg-gray-50 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5 pb-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
        {tags.map((tag, index) => {
          return (
            // タグ
            <div
              className="font-medium rounded inline-flex items-center px-2 py-1 bg-gray-200 gap-1"
              key={index}
            >
              {/* タグ名 */}
              <span>{tag}</span>

              {/* 削除ボタン */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleDeleteTag(index)}
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </div>
          );
        })}

        <input
          {...register('receipients', {
            validate: () =>
              !isDirty || tags.length > 0 || 'Receipients is required',
          })}
          type="text"
          id="receipients"
          className="flex-grow border-0 mb-1 outline-none bg-gray-50"
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
        />
      </div>
      {errors.receipients && (
        <ErrorMessage message={errors.receipients.message} />
      )}

      {/* Submit Button */}
      <div className="flex flex-col items-center mt-6">
        <SubmitButton text="Mint Token" />
        {(isLoading || txIsLoading) && <Loader />}
        {(isError || txIsError) && <ErrorMessage message="Error" />}
      </div>
    </form>
  );
}

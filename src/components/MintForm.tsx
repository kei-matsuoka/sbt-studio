'use client';

import { useState } from 'react';
import { isAddress } from 'viem';
import SubmitButton from './SubmitButton';

export default function MiniForm() {
  const [tags, setTags] = useState<string[]>([]);
  const onClose = (index: number) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const handleKeyDown = (e: any) => {
    // Backspaceが押されたら最後のタグを削除する
    if (e.key === 'Backspace' && e.currentTarget.value === '') {
      onClose(tags.length - 1);
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
      (value, index, self) => self.indexOf(value) === index
    );
    // addressがEthereumアドレスかつ既存のタグに含まれていないものを抽出
    const newTags = filteredValues.filter(
      (address: string) => isAddress(address) && !tags.includes(address)
    );
    // newTagsがあればタグに追加してvalueをリセット
    if (newTags.length > 0) {
      setTags([...tags, ...newTags]);
      e.currentTarget.value = '';
    }
  };

  return (
    <form
      className="bg-white border px-6 py-8 rounded-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <label
        htmlFor="receipients"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Receipients(Required)
      </label>
      <div className="flex flex-wrap text-gray-900 border w-[420px] gap-1 bg-gray-50 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5 pb-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-6">
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
                onClick={() => onClose(index)}
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </div>
          );
        })}

        <input
          type="text"
          id="receipients"
          className="flex-grow border-0 mb-1 outline-none bg-gray-50"
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col items-center">
        <SubmitButton text="Mint Token" />
      </div>
    </form>
  );
}

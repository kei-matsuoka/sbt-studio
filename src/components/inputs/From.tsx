import { isAddress } from 'viem';
import ErrorMessage from '../ErrorMessage';

export default function From({ register, errors }: any) {
  return (
    <div className="mb-6">
      <label
        htmlFor="from"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        From(Required)
      </label>
      <input
        {...register('from', {
          required: 'From is required',
          validate: (value: `0x${string}`) => {
            return isAddress(value) || 'Invalid From';
          },
        })}
        type="text"
        id="from"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="0x..."
      />
      {errors.from && <ErrorMessage message={errors.from.message} />}
    </div>
  );
}

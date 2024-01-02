import ErrorMessage from '../ErrorMessage';

export default function TokenId({ register, errors }: any) {
  return (
    <div className="mb-6">
      <label
        htmlFor="tokenId"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        TokenId(Required)
      </label>
      <input
        {...register('tokenId', {
          required: 'TokenId is required',
          min: {
            value: 0,
            message: 'TokenId must be greater than 0',
          },
        })}
        type="number"
        id="tokenId"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="1"
      />
      {errors.tokenId && <ErrorMessage message={errors.tokenId.message} />}
    </div>
  );
}

import ErrorMessage from '../ErrorMessage';

export default function Amount({ register, errors }: any) {
  return (
    <div className="mb-6">
      <label
        htmlFor="amount"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Amount(Required)
      </label>
      <input
        {...register('amount', {
          required: 'Amount is required',
          min: {
            value: 0,
            message: 'Amount must be greater than 0',
          },
        })}
        type="number"
        id="amount"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="1000"
      />
      {errors.amount && <ErrorMessage message={errors.amount.message} />}
    </div>
  );
}

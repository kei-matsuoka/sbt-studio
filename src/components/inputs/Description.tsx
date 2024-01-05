import ErrorMessage from '../ErrorMessage';

export default function Description({ register, errors }: any) {
  return (
    <div className="mb-6">
      <label
        htmlFor="description"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Description(Required)
      </label>
      <textarea
        {...register('description', {
          required: 'Description is required',
        })}
        id="description"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="This is a membership token for the Fitness Gym. It is a soul-bound token (SBT) that can be used to redeem a 1 year membership at the Fitness Gym."
      />
      {errors.description && (
        <ErrorMessage message={errors.description.message} />
      )}
    </div>
  );
}

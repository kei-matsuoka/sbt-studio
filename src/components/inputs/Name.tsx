import ErrorMessage from '../ErrorMessage';

export default function Name({ register, errors }: any) {
  return (
    <div className="mb-6">
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Name(Required)
      </label>
      <input
        {...register('name', { required: 'Name is required' })}
        type="text"
        id="name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Fitness Gym Membership"
      />
      {errors.name && <ErrorMessage message={errors.name.message} />}
    </div>
  );
}

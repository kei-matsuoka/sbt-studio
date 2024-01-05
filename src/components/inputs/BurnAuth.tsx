import ErrorMessage from '../ErrorMessage';

export default function BurnAuth({ register, errors }: any) {
  return (
    <div className="mb-6">
      <label
        htmlFor="defaultBurnAuth"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Burn Auth(Required)
      </label>
      <select
        id="defaultBurnAuth"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...register('defaultBurnAuth', {
          required: 'Burn Auth is required',
        })}
      >
        <option value="" disabled selected>
          Choose Burn Auth
        </option>
        <option value={0}>Issuer Only</option>
        <option value={1}>Owner Only</option>
        <option value={2}>Both</option>
        <option value={3}>Neither</option>
      </select>
      {errors.defaultBurnAuth && (
        <ErrorMessage message={errors.defaultBurnAuth.message} />
      )}
    </div>
  );
}

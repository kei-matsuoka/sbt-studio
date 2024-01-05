export default function MaxSupply({ register }: any) {
  return (
    <div className="mb-6">
      <label
        htmlFor="maxSupply"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Max Supply
      </label>
      <input
        {...register('maxSupply')}
        type="number"
        id="maxSupply"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="100"
      />
    </div>
  );
}

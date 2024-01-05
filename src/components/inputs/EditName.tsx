export default function EditName({ register }: any) {
  return (
    <div className="mb-6">
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Name(Not Changeable)
      </label>
      <input
        {...register('name')}
        type="text"
        id="name"
        disabled={true}
        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      />
    </div>
  );
}

import Image from 'next/image';
import Dropzone from '../Dropzone';
import ErrorMessage from '../ErrorMessage';

export default function ImageFile({
  register,
  errors,
  file,
  src,
  handleOnChange,
}: any) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Image File(Required)
      </label>
      <div className="flex items-center justify-center">
        <label
          htmlFor="imageFile"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          {!file ? (
            <Dropzone />
          ) : (
            <div className="flex items-center justify-center w-full">
              <Image src={src} alt="image" width={320} height={180} />
            </div>
          )}
          <input
            {...register('imageFile', {
              required: 'Image file is required',
            })}
            type="file"
            id="imageFile"
            className="hidden"
            onChange={handleOnChange}
          />
        </label>
      </div>
      {errors.imageFile && <ErrorMessage message={errors.imageFile.message} />}
    </div>
  );
}

import Image from 'next/image';
import Dropzone from '../Dropzone';

export default function EditImageFile({ register, src, handleOnChange }: any) {
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
          <div className="flex items-center justify-center w-full">
            {src ? (
              <Image src={src} alt="image" width={320} height={180} />
            ) : (
              <Dropzone />
            )}
          </div>
          <input
            {...register('imageFile')}
            type="file"
            id="imageFile"
            className="hidden"
            onChange={handleOnChange}
          />
        </label>
      </div>
    </div>
  );
}

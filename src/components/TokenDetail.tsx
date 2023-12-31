import Image from 'next/image';
import { FormattedCreatedToken } from '@/types';

export default function TokenDetail({
  token,
}: {
  token: FormattedCreatedToken;
}) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex flex-col min-w-[320px] gap-2">
        <Image
          src={token.imageURI}
          alt={token.name}
          width={320}
          height={180}
          className="rounded-lg"
        />
        <a
          href={`https://mumbai.polygonscan.com/address/${token.id}`}
          target="_blank"
          className="flex gap-2 w-fit text-gray-900 bg-gray-100 border border-gray-400 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clipRule="evenodd"
            />
          </svg>

          {token.formattedAddress}
        </a>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <p>Name</p>
          <p className="text-gray-600">{token.name}</p>
        </div>
        <div className="flex flex-col">
          <p>Description</p>
          <p className="text-gray-600 text-sm">{token.description}</p>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <p className="text-sm">Supply</p>
            <p className="text-sm text-gray-600">
              {token.mintedTokens.length + ' / ' + token.maxSupply}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Owners</p>
            <p className="text-sm text-gray-600">{token.owners}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Date Created</p>
            <p className="text-sm text-gray-600">{token.formattedDate}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Burn Auth</p>
            <p className="text-sm text-gray-600">{token.formattedBurnAuth}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

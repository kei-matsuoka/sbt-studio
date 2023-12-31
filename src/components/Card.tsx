import Image from 'next/image';
import Link from 'next/link';
import { Token, TokenConfig } from '@/types';

export default function Card({
  page,
  token,
}: {
  page: string;
  token: Token | TokenConfig;
}) {
  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-[1.03] transform transition duration-100 ease-in-out">
      <Link href={`${page}/${token.id}`}>
        <Image
          src={token.imageURI}
          alt={token.name}
          width={320}
          height={180}
          className="rounded-t-lg"
        />
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {token.name}
          </h5>
          <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
            {token.description}
          </p>
        </div>
      </Link>
    </div>
  );
}

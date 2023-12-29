import Image from 'next/image';
import Link from 'next/link';
import { Token } from '@/types';

export default function Card({ token }: { token: Token }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`tokens/${token.id}`}>
        <Image
          src={token.imageURI}
          alt={token.name}
          width={384}
          height={180}
          className="rounded-t-lg"
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {token.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {token.description}
          </p>
        </div>
      </Link>
    </div>
  );
}

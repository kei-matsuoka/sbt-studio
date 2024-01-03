import Image from 'next/image';
import Link from 'next/link';

export default function HorizontalCard({
  href,
  src,
  alt,
  title,
  description,
}: {
  href: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Image
        className="object-cover h-auto w-48 rounded-none rounded-s-lg"
        src={src}
        alt={alt}
        width={200}
        height={200}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
}

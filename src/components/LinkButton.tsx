import Link from 'next/link';

export default function LinkButton({
  children,
  href,
  text,
}: {
  children: React.ReactNode;
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:scale-[1.03] transform transition duration-100 ease-in-out"
    >
      {children}
      {text}
    </Link>
  );
}

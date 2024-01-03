'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Home from './icons/Home';
import Identification from './icons/Identification';
import Cloud from './icons/Cloud';
import Chat from './icons/Chat';
import Chart from './icons/Chart';
import Code from './icons/Code';

export default function Sidebar() {
  const path = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return path === '/';
    } else {
      return path.includes(href);
    }
  };

  const pageConfig = [
    {
      href: '/',
      title: 'Home',
      icon: <Home />,
    },
    {
      href: '/tokens',
      title: 'Tokens',
      icon: <Identification />,
    },
    {
      href: '/airdrop',
      title: 'Airdrop',
      icon: <Cloud />,
    },
    {
      href: '/messaging',
      title: 'Messaging',
      icon: <Chat />,
    },
    {
      href: '/analytics',
      title: 'Analytics',
      icon: <Chart />,
    },
    {
      href: '/integration',
      title: 'Integration',
      icon: <Code />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 z-40 w-52 h-screen pt-20 transition-transform -translate-x-full bg-white  shadow-md sm:translate-x-0">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {pageConfig.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className={`flex items-center p-2 ${
                  isActive(page.href)
                    ? 'text-fuchsia-600'
                    : 'text-gray-900 hover:text-fuchsia-600 duration-100'
                }`}
              >
                {page.icon}
                <span className="ms-3">{page.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

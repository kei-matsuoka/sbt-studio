'use client';

import PageTitle from '@/components/PageTitle';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export default function Home() {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="flex flex-col items-center">
      {/* <PageTitle title="Home" /> */}
      <p className="font-bold text-5xl text-center leading-tight mt-6 mb-10">
        Easily issue and manage
        <br />
        SoulBound Tokens.
      </p>

      <Image
        src="/membership.png"
        alt="Membership"
        width={640}
        height={180}
        className="mb-8 rounded-2xl"
      />

      <button
        className="rounded-lg px-8 text-white font-semibold py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:scale-[1.03] transform transition duration-100 ease-in-out"
        onClick={openConnectModal}
      >
        Get Started
      </button>

      <p className="font-bold text-5xl mt-20 mb-10">Feature</p>

      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="/mint.png"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 pt-5 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="/mint.png"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 pt-5 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="/mint.png"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 pt-5 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>

    </div>
  );
}

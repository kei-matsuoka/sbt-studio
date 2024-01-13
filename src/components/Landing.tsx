'use client';

import Image from 'next/image';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { features } from '@/constants';

export default function Landing() {
  const { openConnectModal } = useConnectModal();

  return (
    <div className="flex flex-col items-center">
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

      {features.map((feature) => (
        <div
          className="flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row max-w-2xl mb-6"
          key={feature.title}
        >
          <Image
            className="object-cover rounded-none rounded-s-lg"
            src={feature.src}
            alt={feature.alt}
            width={192}
            height={192}
          />
          <div className="flex flex-col justify-between p-4 pt-5 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {feature.title}
            </h5>
            <p className="mb-2 font-normal text-gray-700">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

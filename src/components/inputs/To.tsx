import { isAddress } from 'viem';
import ErrorMessage from '../ErrorMessage';
import { MintedToken, Token } from '@/types';

export default function To({
  register,
  errors,
  tokens,
  selectedToken,
  setSelectedToken,
  dropdownIsOpen,
  setDropdownIsOpen,
}: any) {
  return (
    <div className="flex flex-col mb-6">
      <label
        htmlFor="to"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        To(Required)
      </label>
      <div className="flex relative">
        {/* Button */}
        <button
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
        >
          {selectedToken ? selectedToken.name : 'Select Token' + ' '}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {/* Dropdown */}
        {dropdownIsOpen && (
          <div className="absolute top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {tokens?.map((token: Token) => (
                <li key={token.id}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setSelectedToken(token);
                      setDropdownIsOpen(false);
                    }}
                  >
                    {token.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Select */}
        <select
          id="to"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register('to', {
            required: 'To is required',
            validate: (value: `0x${string}`) => {
              return isAddress(value) || 'Invalid To';
            },
          })}
        >
          <option selected disabled>
            Select Address
          </option>
          {selectedToken?.mintedTokens.map((token: MintedToken) => (
            <option
              key={token.tokenId}
              value={token.minter.id}
            >{`TokenID: ${token.tokenId} - Holder: ${token.minter.id}`}</option>
          ))}
        </select>
      </div>
      {errors.to && <ErrorMessage message={errors.to.message} />}
    </div>
  );
}

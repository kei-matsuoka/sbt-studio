import { tokenTableHeader } from '@/constants';
import { FormattedMintedToken } from '@/types';

export default function TokenTable({
  tokens,
  burnAuth,
  handleBurn,
}: {
  tokens: FormattedMintedToken[];
  burnAuth: number;
  handleBurn: (tokenId: number) => void;
}) {
  const isBurnAuth = burnAuth === 0 || 2;

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tokenTableHeader.map((header) => (
              <th scope="col" className="px-6 py-3" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokens.map((token: FormattedMintedToken) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={token.tokenId}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {token.tokenId}
              </th>
              <td className="px-6 py-4">
                <a
                  href={`https://mumbai.polygonscan.com/address/${token.minter.id}`}
                  target="_blank"
                  className="text-blue-600"
                >
                  {token.minter.id}
                </a>
              </td>

              <td className="px-6 py-4">{token.formattedDate}</td>
              <td className="px-6">
                {isBurnAuth && token.status !== 'Burned' ? (
                  <button
                    className="text-white rounded-md text-xs px-3.5 py-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:scale-[1.03] transform transition duration-100 ease-in-out"
                    onClick={() => handleBurn(token.tokenId)}
                  >
                    Burn
                  </button>
                ) : (
                  token.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

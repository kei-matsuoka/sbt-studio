import { tokenTableHeader } from '@/constants';
import { FormattedMintedToken } from '@/types';

export default function TokenTable({
  tokens,
}: {
  tokens: FormattedMintedToken[];
}) {
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
              <td className="px-6 py-4">{token.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

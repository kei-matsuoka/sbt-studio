import { tokenTableHeader } from '@/constants';
import { FormattedToken } from '@/types';

export default function TokenTable({ tokens }: { tokens: FormattedToken[] }) {
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
          {/* 9回繰り返す */}
          {[...Array(9)].map((_, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="h-2 bg-gray-300 rounded" />
              </th>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-300 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-300 rounded" />
              </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-300 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { tokenTableHeader } from '@/constants';

export default function TokenTable() {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
            <tr className="bg-white border-b" key={index}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <div className="h-2 bg-gray-300 rounded animate-pulse" />
              </th>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-300 rounded animate-pulse" />
              </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-300 rounded animate-pulse" />
              </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-300 rounded animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

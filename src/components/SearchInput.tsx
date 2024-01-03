import { Dispatch, SetStateAction } from 'react';

export default function SearchInput({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-48">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Search"
        />
      </div>
    </>
  );
}

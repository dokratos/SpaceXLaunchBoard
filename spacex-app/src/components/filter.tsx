'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const Filter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('filter', value);
    } else {
      params.delete('filter');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div 
    className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Filter
      </label>
      <select
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        
        onChange={(e) => {
          handleFilter(e.target.value);
        }}
      >
        <option value="default">All</option>
        <option value="date">Date</option>
        <option value="upcoming">Upcoming</option>
        <option value="success">Success</option>
      </select>
    </div>
  )
}

export default Filter
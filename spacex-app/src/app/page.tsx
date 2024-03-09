import { Suspense } from 'react';
import LaunchList from '@/components/list';
import Search from '@/components/searchBar';
import Filter from '@/components/filter';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    filter?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const filter = searchParams?.filter || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>space-x-launches</h1>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Search placeholder='...'/>
        <Filter />
      </div>
      <Suspense key={query + currentPage} >
        <LaunchList query={query} currentPage={currentPage} filter={filter}/>
      </Suspense>
    </main>
  );
}

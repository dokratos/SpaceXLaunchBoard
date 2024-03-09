import { Suspense } from 'react';
import LaunchList from '@/components/LaunchList';
import Search from '@/components/Search';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>space-x-launches</h1>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Search placeholder='...'/>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          FILTER
        </div>
      </div>
      <Suspense key={query + currentPage} >
      <LaunchList query={query} currentPage={currentPage}/>
      </Suspense>
    </main>
  );
}

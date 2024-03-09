import { gql } from '@apollo/client';
import { getClient } from "@/lib/client";
import LaunchCard from '@/components/LaunchCard';
import Search from '@/components/Search';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const data = await getLaunches();
  // console.log('launches', data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>space-x-launches</h1>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Search placeholder='...'/>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          FILTER
        </div>
      </div>
      
      {data.map((launch: any) => {
        return (
          <LaunchCard 
          key={launch.id}
          id={launch.id}
          missionName={launch.mission_name}
          image={launch.links.flickr_images}
          success={launch.launch_success}
          />
        );
      })}
    </main>
  );
}

export async function getLaunches() {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Launches {
        launches {
          id
          launch_date_local
          launch_success
          mission_name
          mission_id
          details
          rocket {
            rocket_name
          }
          links {
            flickr_images
            mission_patch
            mission_patch_small
          }
        }
      }
   `});

  return data.launches;
}
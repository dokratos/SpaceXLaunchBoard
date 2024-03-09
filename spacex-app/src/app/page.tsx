// "use client"

import Image from "next/image";
import { gql, useQuery } from '@apollo/client';
import { getClient } from "@/lib/client";

export default async function Home() {
//   const { data } = useQuery(
//     gql`
//     query Query {
//   launches {
//     mission_name
//     launch_date_local
//     launch_success
//     links {
//       flickr_images
//       mission_patch
//     }
//     rocket {
//       rocket_name
//     }
//     details
//     mission_id
//   }
// }
// `);

const data = await getLaunches();
  console.log('launches', data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>space-x-launches</h1>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          SEARCH
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          FILTER
        </div>
      </div>

      
  {data.map((launch: any) => {
    return (
      <a key={launch.id} href={launch.links.video_link} >
        <h3>{ launch.mission_name }</h3>
        <p><strong>Launch Date:</strong> { new Date(launch.launch_date_local).toLocaleDateString("en-US") }</p>
      </a>
    );
  })}
    </main>
  );
}

export async function getLaunches() {
  const client = getClient();
const { data } = await client.query({
  query: gql`
       query Query {
     launches {
       mission_name
       launch_date_local
       launch_success
       links {
         flickr_images
         mission_patch
       }
       rocket {
         rocket_name
       }
       details
       mission_id
     }
   }
   `
});

return data.launches;
}
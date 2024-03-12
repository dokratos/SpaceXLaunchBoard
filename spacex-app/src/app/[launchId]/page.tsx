import React from 'react'
import Image from 'next/image'
import { gql } from "@apollo/client";
import { getClient } from "@/lib/client";
import Link from "next/link";
import { PageDetailLaunch } from '@/lib/definitions';

const GET_LAUNCH_DETAILED = gql`
query Query($launchId: ID!) {
  launch(id: $launchId) {
    details
    launch_date_local
    launch_site {
      site_name
    }
    links {
      flickr_images
      mission_patch
      mission_patch_small
    }
    mission_name
    rocket {
      rocket {
        company
        country
        description
        diameter {
          meters
        }
        height {
          meters
        }
        name
        payload_weights {
          id
          kg
          lb
          name
        }
      }
    }
  }
}`

export default async function LaunchDetail({
  params,
}: {
  params: { launchId: string };
}) {

  const client = getClient();
  const { data, error, loading } = await client.query({
    query: GET_LAUNCH_DETAILED,
    variables: {
      "launchId": params.launchId
    }
  });

  if (loading || !data) {
    return <p>Loading...</p>
  }

  if (error) {
    console.error(error);
    if (error) return <p>{error.message}</p>;
  }

  const launch: PageDetailLaunch = data?.launch;

  const src = launch?.links?.flickr_images[0] || 'https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg'

  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="flex-start text-[#32324D] font-bold text-3xl h-16 p-16">{launch?.mission_name}</h1>
      <section className='sm:grid sm:grid-cols-2 sm:gap-6 flex-row p-16 mb-8'>
        <Image 
          src={src} 
          alt='Launch image..' 
          width={500} 
          height={500}
          className="rounded"
          ></Image>
        <article>
          <div className='bg-[#F6F6F9] w-full rounded min-h-64 p-8 sm:h-1/3'>
            <p className="text-[#A5A5BA] font-bold text-base">DATE</p>
            <p>{launch?.launch_date_local}</p>
            <p className="text-[#A5A5BA] font-bold text-base mt-6 ">LOCATION</p>
            <p>{launch?.launch_site?.site_name || "unknown location"}</p>
            <p className="text-[#A5A5BA] font-bold text-base mt-6 ">ROCKET</p>
            <p>{launch?.rocket?.rocket.name}</p>
          </div>
          <p className="text-[#666687] text-base font-normal mt-6 px-2">{launch?.details}</p>
        </article>
      </section>
      <div className="bg-[#F6F6F9] w-full h-16 fixed bottom-0 flex justify-end">
        <Link href={'/'} className='mt-6 mr-3'>Back Home</Link>
      </div>
    </main>
  )
}
"use client";

import React, { Suspense } from 'react'
import Image from 'next/image'
import {useSearchParams, usePathname} from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

export const GET_LAUNCH = gql`
query Query($launchId: ID!) {
  launch(id: $launchId) {
    details
    launch_date_local
    mission_name
    rocket {
      rocket_name
      rocket {
        success_rate_pct
      }
    }
  }
}`;

const LaunchModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  const id = searchParams.get("id");

  const { data, error, loading } = useQuery(GET_LAUNCH, {
    variables: {
      "launchId": id
    }
  });

  if (id && error) {
    console.error(error);
    if (error) return <p>An error occurred</p>;
  }
  
  if (id && loading || id && !data) {
    return <p>Loading...</p>
  }

 
  return (
    <Suspense fallback={<>Loading...</>}>
    {modal &&
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex">
        <div className="bg-[#EAEAEF] rounded-lg sm:w-1/2 w-full m-auto p-8 grid grid-cols-1 gap-4 text-[#32324D] text-sm">
          <div className="bg-white h-16 relative rounded">
            <p className="font-bold uppercase absolute left-5 top-4">MISSION {data?.launch?.mission_name}</p>
          </div>
          <Image src={data?.launch?.links?.flickr_images[0] || 'https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg'} 
            alt='Launch image..' 
            width={400}
            height={400}
            className="rounded w-full h-80 object-cover"
          ></Image>
          <p className='font-normal'>{data?.launch?.rocket?.rocket_name}</p>
          <p className='font-normal'>{data?.launch?.launch_date_local}</p>
          <p className='font-normal'>{data?.launch?.details}</p>
          <div className="bg-white h-16 rounded w-full flex-row flex items-stretch justify-around pt-3">
            <Link href={pathname}>
                <button type="button" className="bg-red-500 text-white px-4 py-2.5 rounded">Close</button>
            </Link>
            <Link href={`/${id}`}>
              <button type="button" className="bg-[#0C75AF] text-white px-4 py-2.5 rounded">About</button>
            </Link>
          </div>
        </div>
      </dialog>
    }
    </Suspense>
  )
}

export default LaunchModal
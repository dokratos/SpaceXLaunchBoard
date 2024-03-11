"use client";

import React from 'react'
import Image from 'next/image'
import {useSearchParams, usePathname} from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const GET_LAUNCH = gql`
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
    ships {
      name
      image
    }
  }
}`;

const LaunchModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  const id = searchParams.get("id");

  const { data } = useQuery(GET_LAUNCH, {
    variables: {
      "launchId": id
    }
  });

  return (
    <>
    {modal &&
        <dialog
            className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
            <div className="bg-white m-auto p-8">
                <div className="flex flex-col items-center">
                    <p>{data?.launch.mission_name}</p>
                    <br/>
                    <Link href={pathname}>
                        <button type="button" className="bg-red-500 text-white p-2">Close Modal</button>
                    </Link>
                    <Link href={`/${id}`}>About</Link>
                </div>
            </div>
        </dialog>
    }
</>
  )
}

export default LaunchModal
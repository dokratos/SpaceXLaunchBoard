"use client";

import React from 'react'
import Image from 'next/image'
import { gql, useQuery } from "@apollo/client";
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
    ships {
      image
      model
      name
      missions {
        flight
        name
      }
    }
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

export default function LaunchDetail({
  params,
}: {
  params: { launchId: string };
}) {


  const { data } = useQuery(GET_LAUNCH_DETAILED, {
    variables: {
      "launchId": params.launchId
    }
  });

  const launch = data?.launch;

  console.log(data);

  const src = launch?.links?.flickr_images[0] || 'https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg'
  console.log(launch?.links?.flickr_images[0]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{launch?.mission_name}</h1>
      <Image src={src} alt='Launch image..' width={500} height={500}></Image>
      <p>{launch?.details}</p>
      <Link href={'/'}>Back Home</Link>
    </main>
  )
}
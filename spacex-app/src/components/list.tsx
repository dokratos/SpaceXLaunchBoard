import React from 'react'
import { gql } from '@apollo/client';
import { getClient } from "@/lib/client";
import LaunchCard from './card';
import { SimpleLaunch } from '@/lib/definitions';

export default async function LaunchList({
  query,
  filter,
  currentPage,
}: {
  query: string;
  filter: string;
  currentPage: number;
}) {
  const data = await getLaunches(query, filter, currentPage);

  return (
    <div>
      {data.map((launch: any) => {
      return (
        <LaunchCard 
        key={launch.id}
        id={launch.id}
        rocketName={launch.rocket.rocket_name}
        missionName={launch.mission_name}
        image={launch.links.flickr_images}
        success={launch.launch_success}
        />
      );
    })}
    </div>
  )
}

export async function getLaunches(
  query: string,
  filter: string,
  currentPage: number,
) {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query Query {
        launches {
          launch_date_local
          launch_success
          upcoming
          id
          mission_name
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

  let launches = data.launches;

  if (query.length > 2) {
    const regex = new RegExp(query, 'i');
    launches = data.launches.filter((launch: SimpleLaunch) => {
      return launch.rocket.rocket_name.match(regex);
    })
  }

  // if (filter)

  return launches;
}

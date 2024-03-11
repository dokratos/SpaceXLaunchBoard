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
    <div className="md:grid md:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {data.map((launch: any) => {
      return (
        <LaunchCard 
        key={launch.id}
        id={launch.id}
        rocketName={launch.rocket.rocket_name}
        missionName={launch.mission_name}
        image={launch.links.flickr_images}
        date={launch.launch_date_local}
        upcoming={launch.upcoming}
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

  let launches: SimpleLaunch[] = [...data.launches];

  if (query.length > 2) {
    const regex = new RegExp(query, 'i');
    launches = launches.filter((launch: SimpleLaunch) => {
      return launch.rocket.rocket_name.match(regex);
    })
  }

  if (filter === "date") {
    launches = launches.sort((a: SimpleLaunch, b: SimpleLaunch) => new Date(b.launch_date_local).getTime() - new Date(a.launch_date_local).getTime());
  }

  if (filter === "upcoming") {
    launches = launches.filter((launch: SimpleLaunch) => {
      return !!launch.upcoming;
    })
    launches.sort((a: SimpleLaunch, b: SimpleLaunch) => new Date(b.launch_date_local).getTime() - new Date(a.launch_date_local).getTime());
  }

  // if (filter === "success") {
  //   launches = launches.filter((launch: SimpleLaunch) => {
  //     return !!launch.launch_success;
  //   })
  // }

  return launches;
}

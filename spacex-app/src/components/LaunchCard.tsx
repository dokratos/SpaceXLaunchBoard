import React from 'react'
import Image from 'next/image'
import Link from "next/link";

type LaunchCardProps = {
  id: string,
  missionName: string,
  image: string[],
  success: boolean
}

const LaunchCard = ({ id, missionName, image, success }: LaunchCardProps) => {
 
  return (
    <article>
      <Image src={image[0]} alt='Launch image..' width={100} height={100}></Image>
      <p>{missionName}</p>
      <p>{success}</p>
      <Link href={`?modal=true&id=${id}`}>
        <button type="button" className="bg-blue-500 text-white p-2">Open Modal</button>
      </Link>
    </article>
  )
}

export default LaunchCard
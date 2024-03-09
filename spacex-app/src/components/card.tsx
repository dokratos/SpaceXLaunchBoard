import React from 'react'
import Image from 'next/image'
import Link from "next/link";

type LaunchCardProps = {
  id: string,
  rocketName: string,
  missionName: string,
  image: string[],
  success: boolean,
  date: string
}

const LaunchCard = ({ id, rocketName, missionName, image, success, date }: LaunchCardProps) => {
  const src = image[0] || 'https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg'
 
  return (
    <article>
      <Image src={src} alt='Launch image..' width={100} height={100}></Image>
      <p>{missionName}</p>
      <p>{rocketName}</p>
      <p>{success}</p>
      <p>{date}</p>
      <Link href={`?modal=true&id=${id}`}>
        <button type="button" className="bg-blue-500 text-white p-2">Open Modal</button>
      </Link>
      <Link href={id}>About</Link>
    </article>
  )
}

export default LaunchCard
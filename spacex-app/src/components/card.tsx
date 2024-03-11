import React from 'react'
import Image from 'next/image'
import Link from "next/link";

type LaunchCardProps = {
  id: string,
  rocketName: string,
  missionName: string,
  image: string[],
  date: string,
  upcoming: boolean
}

const LaunchCard = ({ id, rocketName, missionName, image, date, upcoming }: LaunchCardProps) => {
  const src = image[0] || 'https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg'
 
  return (
    <Link href={`?modal=true&id=${id}`}>
      <article className="shadow-lg transition duration-300 group transform hover:-translate-y-1  hover:-translate-x-1 hover:shadow-2xl rounded cursor-pointer h-60 w-[19rem]">
        <Image src={src} 
          alt='Launch image..' 
          width={400}
          height={400}
          className="rounded-t w-full h-44 object-cover"
        ></Image>
        <div className="relative h-16 text-sm">
          <span className="font-semibold text-[#4A4A6A] absolute left-4 top-3">{missionName}</span>
          <span className="bg-[#EAEAEF] text-[#666687] uppercase absolute right-4 top-3 ">{rocketName}</span>
          <p className="absolute top-8 left-4 text-[#8E8EA9] text-normal">{date}</p>
        </div>
      </article>
    </Link>
  )
}

export default LaunchCard
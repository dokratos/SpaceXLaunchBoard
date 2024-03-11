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
    <article className="shadow-lg transition duration-300 group transform hover:-translate-y-1  hover:-translate-x-1 hover:shadow-2xl rounded cursor-pointer h-60 w-[19rem]"
    >
      <Image src={src} 
        alt='Launch image..' 
        width={400}
        height={400}
        className="rounded-t w-full h-44 object-cover"
      ></Image>
      <div className="flex mt-3">
        <span className="font-semibold text-[#4A4A6A] text-sm ml-4">{missionName}</span>
        <span className="bg-[#EAEAEF] text-[#666687] text-sm uppercase flex-end">{rocketName}</span>
        <p>{date}</p>
      </div>
      {/* <Link 
        href={`?modal=true&id=${id}`}
        className="flex justify-center items-center bg-purple-500 bg-opacity-80  absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
        >
        Open Modal
      </Link> */}
    </article>
  )
}

export default LaunchCard
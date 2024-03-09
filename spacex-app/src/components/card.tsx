import React from 'react'
import Image from 'next/image'
import Link from "next/link";

type LaunchCardProps = {
  id: string,
  rocketName: string,
  missionName: string,
  image: string[],
  date: string
}

const LaunchCard = ({ id, rocketName, missionName, image, date }: LaunchCardProps) => {
  const src = image[0] || 'https://farm9.staticflickr.com/8617/16789019815_f99a165dc5_o.jpg'
 
  return (
    <article className="shadow-lg transition duration-300 group transform hover:-translate-y-1  hover:-translate-x-1 hover:shadow-2xl rounded-lg cursor-pointer"
    >
      <Image src={src} 
        alt='Launch image..' 
        width={400}
        height={400}
        className="rounded-t-lg w-full min-h-64 max-h-64 h-3/5 object-cover"
      ></Image>
      <p className="font-medium text-xl leading-8">{missionName}</p>
      <p>{rocketName}</p>
      <p>{date}</p>

      <Link 
        href={`?modal=true&id=${id}`}
        >
        <button type="button" 
        className="bg-blue-500 text-white p-2"
        // className="flex justify-center items-center bg-purple-500 bg-opacity-80  absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
        >Open Modal</button>
      </Link>
      <Link href={id}>
      <button type="button" 
        className="bg-blue-500 text-white p-2"
        // className="flex justify-center items-center bg-purple-500 bg-opacity-80  absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
        >About</button>
      </Link>
    </article>
  )
}

export default LaunchCard
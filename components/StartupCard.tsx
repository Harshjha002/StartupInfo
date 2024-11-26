import { formatDate } from '@/utils/utils'
import Link from 'next/link';
import React from 'react'
import { FaEye } from "react-icons/fa";
import Image from 'next/image';
import { Author, Startup } from '@/sanity/types';

export  type StartupTypeCard =Omit<Startup , "author"> & {author?: Author}

const StartupCard = ({post} : {post:StartupTypeCard}) => {

    const {_createdAt , views , author,title , category , image,_id,description} =post

  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p className='startup_card_date'>
            {formatDate(_createdAt)}
        </p>
        <div className='flex gap-1.5'>
        <FaEye className='size-6 text-primary'/>
        <span className='text-16-medium'>{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className='flex-1'>
            <Link href={`/user/${author?._id}`}>
                <p className='text-16-medium line-clamp-1'>{author?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
            </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
            <Image src="https://placehold.co/48x48" alt='placehold image'
            width={48}
            height={48}
            className='rounded-full'
            />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>{description}</p>
        <img src={image} alt="placeholder" className='startup-card_img'/>
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className='text-16-medium'>{category}</p>
        </Link>
        <button className='startup-card_btn'>
            <Link href={`/startup/${_id}`}>
                Details
            </Link>
        </button>
      </div>
    </li>
  )
}

export default StartupCard

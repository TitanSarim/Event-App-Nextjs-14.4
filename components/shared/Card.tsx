import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import UpdateImage from '../../public/assets/icons/edit.svg'
import Image from 'next/image'

type CardProps = {
    event: any
}

const Card = ({event}: CardProps) => {


    const {sessionClaims} = auth()
    const userId = sessionClaims?.userId as string

    const isEventCreater = userId === event.userId

  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
        <Link href={`/events/${event.id}`} style={{backgroundImage: `url(${event.imageUrl})`}} className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500'/>

        {isEventCreater && (
            <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
                <Link href={`/events/${event.id}/update`}>
                    <Image src={UpdateImage} alt="edit" width={20} height={20}/>
                </Link>
            </div>
        )}

        <Link href={`/events/${event.id}`} className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'>

            <div className='flex gap-2'>
                <span className='p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60'>
                    {event.status}
                </span>
                <p className='p-semibold-14 w-min rounded-full bg-gray-500/10 px-4 py-1 text-gray-500'>{event.category}</p>
            </div>

            <p className='p-medium-16 p-medium-18 text-gray-500'>
                {formatDateTime(event.createdAt).dateTime}
            </p>

            <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black'>{event.title}</p>

            <div className='flex-between w-full'>
                <p className='p-medium-14 md:p-medium-16 text-grey-600'>
                    {event.user.firstName} {event.user.lastname}
                </p>
            </div>

        </Link>    
    
    </div>
  )
}

export default Card

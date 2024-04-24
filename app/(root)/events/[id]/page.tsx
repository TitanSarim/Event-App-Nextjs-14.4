import { getEventById } from '@/lib/actions/event.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import CalenderIcon from '../../../../public/assets/icons/calendar.svg'
import LocationIcon from '../../../../public/assets/icons/location.svg'
import { formatDateTime } from '@/lib/utils'

const EventDetails = async ({params: {id}}: SearchParamProps) => {

    console.log("id", id)

    const event = await getEventById(id)

    console.log("event", event)

  return (
    <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>

        <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl '>
            <Image src={event.event.imageUrl} height={1000} width={1000} alt='Hero Image' className='h-full min-h-[300px] object-cover object-center'/>
            
            <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                <div className='flex flex-col gap-6'>
                    <h2 className='h2-bold'>{event.event.title}</h2>
                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                        <div className='flex gap-3'>
                            <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>{event.event.status}</p>
                            <p className='p-medium-16 rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500'>{event.event.category}</p>
                        </div>
                        <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                            by{' '}
                            <span className='text-primary-500'>
                                {event.eventUser.firstName} {event.eventUser.lastname}
                            </span>
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-5'>
                    <div className='flex gap-2 md:gap-3'>
                        <Image src={CalenderIcon} alt='calender' width={32} height={32}/>
                        <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
                            <p>{formatDateTime(event.event.updatedAt).dateOnly}</p>
                        </div>
                    </div>
                </div>

                <div className='p-regular-20 flex item-center gap-3'>
                    <Image src={LocationIcon} alt='Location' width={32} height={32}/>
                    <p className='p-medium-16 lg:p-regular-20'>{event.event.address}</p>
                </div>

            

                <div className='flex flex-col gap-2'>
                    <p className='p-bold-20 text-grey-600'>Description</p>
                    <p className='p-medium-16 lg:p-regular-18'>{event.event.description}</p>
                </div>
                
            </div>
        </div>


    </section>
  )


}

export default EventDetails
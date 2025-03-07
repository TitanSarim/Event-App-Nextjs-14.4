import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async({ searchParams }: SearchParamProps) => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const organizedEvents = await getEventsByUser({userId: userId, page: eventsPage})


  return (
    <>  

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Your Lists</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/alerts/create">
              Create New List
            </Link>
          </Button>
        </div>
      </section>


      <section className='wrapper my-8'>

        <Collection data={organizedEvents?.data} emptyTitle="No Lists Found" emptyStateSubText="List Something" collectionType="All_Events" limit={6} page={eventsPage} totalPages={organizedEvents?.totalPages}/>

      </section>
    
    </>
  )
}

export default ProfilePage
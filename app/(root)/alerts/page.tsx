import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const AlertPage = () => {
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Your Alerts</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Alert
            </Link>
          </Button>
        </div>
      </section>
    
    
    </>
  )
}

export default AlertPage
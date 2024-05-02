import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {getAllAlerts } from '@/lib/actions/alert.actions'
import { auth } from '@clerk/nextjs'
import { TbCategory2 } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import DeleteConfermationAlert from '@/components/shared/DeleteConfermationAlert'

const AlertPage = async () => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const getAllAlert = await getAllAlerts({userId})
  

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Your Alerts</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/alerts/create">
              Create New Alert
            </Link>
          </Button>
        </div>
      </section>
    
      <section className='all-alerts'>
        <div className='all-alerts-container'>
          {getAllAlert?.data?.map((alert: any) => (
            <div key={alert.id} className='all-alerts-wrapper'>
              <p>
                <TbCategory2 size={24}/>
                {alert.category}
              </p>
              <span>
                <CiLocationOn size={24}/>
                {alert.city}
              </span>
              <div>
                {/* <IoTrashBinOutline size={40}/> */}
                <DeleteConfermationAlert alertId={alert.id}/>
              </div>
            </div>
          ))}
        </div>
      </section>


    </>
  )
}

export default AlertPage
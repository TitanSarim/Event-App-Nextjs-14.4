import AlertForm from '@/components/shared/AlertForm'
import { auth } from '@clerk/nextjs'
import React from 'react'

const CreateAlert = () => {
  const {sessionClaims} = auth()

    const userId = sessionClaims?.userId as string
  
    return (
        <>
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <h3 className='wrapper h3-bold text-center sm:text-left'>Create Alert</h3>
            </section>

            <div className='wrapper my-8'>
                <AlertForm userId={userId}/>
            </div>
        </>
    )
}

export default CreateAlert
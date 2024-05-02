'use client'

import React, { useEffect, useState } from 'react'
import { useTransition } from 'react'
import { IoTrashBinOutline } from "react-icons/io5";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog'

import { deleteAlert } from '@/lib/actions/alert.actions'

type EventDeleteProps =  {
    alertId: number;
}

const DeleteConfermationAlert = ({alertId}: EventDeleteProps) => {


    let [isPending, startTransition] = useTransition()
    const [isDeleted, setIsDeleted] = useState<any>(false) 

  return (
     <AlertDialog>
      <AlertDialogTrigger >
          <div className='alert-delete-button'>
            <IoTrashBinOutline size={40}/>
          </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this alert
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                const res =  await deleteAlert({ alertId})
                if(res.success === true) {
                  setIsDeleted(true)
                  window.location.reload()
                }
              })
            }>
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfermationAlert
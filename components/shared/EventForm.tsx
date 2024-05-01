"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z  from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from '@/lib/validator';
import { eventDefaultValues } from '@/constants';
import DropDown from './DropDown';
import { Textarea } from '../ui/textarea';
import FileUploader from './FileUploader';
import { useState } from 'react';
import StatusDropDown from './StatusDropDown';
import {useUploadThing} from '@/lib/uploadthing'
import { useRouter } from 'next/navigation';
import { createEvent, updateEvent } from '@/lib/actions/event.actions';
import SelectCity from './SelectCity';


type EventFormProps ={
    userId: string,
    type: "Create" | "Update"
    event?: any,
    eventId?: number
}

const EventForm = ({userId, type, event, eventId}: EventFormProps) => {


    const [files, setFiles] = useState<File[]>([])
    const initialValues = event && type === 'Update' ? event :eventDefaultValues;
    const router = useRouter();

    const {startUpload} = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
      })
     

      // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        
        let uploadedImageUrl = values.imageUrl

        if(files.length > 0){
            const uploadedImages = await startUpload(files)
            if(!uploadedImages){
                return
            }
            uploadedImageUrl = uploadedImages[0].url
        }


        if(type === 'Create'){
            try {
                const newEvent = await createEvent({
                    event:{...values, imageUrl:uploadedImageUrl}, userId, path: '/profile'
                })
                if(newEvent){
                    form.reset()
                    router.push(`/events/${newEvent.id}`)
                }

            } catch (error) {
                console.log(error)
            }
        }
        
        if(type === 'Update') {
            if(!eventId){
                router.back()
                return
            }
            try {
                const updatedEvent = await updateEvent({
                    userId, event:{...values, imageUrl:uploadedImageUrl, id: eventId}, path: `/events/${eventId}`
                })
                if(updatedEvent){
                    form.reset()
                    router.push(`/events/${updatedEvent.id}`)
                }

            } catch (error) {
                console.log(error)
            }
        }


    }


  return (
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        <div className='flex flex-col gap-5 md:flex-row'>

            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem className='w-full'>
                <FormControl>
                    <Input placeholder="Title" {...field} className='input-field'/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                <FormItem className='w-full'>
                <FormControl>
                    <DropDown onChangeHandler={field.onChange} value={field.value}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

        </div>
        
        <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className='w-full'>
                    <FormControl className='h-72'>
                        <Textarea placeholder="Description" {...field} className='textarea rounded-2xl'/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem className='w-full'>
                    <FormControl className='h-72'>
                       <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem className='w-full'>
                    <FormControl>
                        <Input placeholder="Enter Your Full Address" {...field} className='input-field'/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            /> 

            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem className='w-full'>
                    <FormControl>
                        <SelectCity onChangeHandler={field.onChange} value={field.value}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormItem className='w-full'>
                    <FormControl>
                        <StatusDropDown onChangeHandler={field.onChange} value={field.value}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

                
        </div>
       
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className='button col-span-2 w-full'>
            {form.formState.isSubmitting ? ('Submitting...') : `${type} List`}
        </Button>
      </form>

    </Form>
  )
}

export default EventForm
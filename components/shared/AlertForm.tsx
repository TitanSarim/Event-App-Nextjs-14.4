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
import { AlertFormSchema } from '@/lib/validator';
import { eventDefaultValues } from '@/constants';
import { useRouter } from 'next/navigation';
import DropDown from './DropDown';
import SelectCity from './SelectCity';

type EventFormProps ={
    userId: string,
}
const AlertForm = ({userId}: EventFormProps) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof AlertFormSchema>>({
        resolver: zodResolver(AlertFormSchema),
    })

    async function onSubmit(values: z.infer<typeof AlertFormSchema>) {
        // try {
        //     const newEvent = await createEvent({
        //         event:{...values, imageUrl:AlertFormSchema}, userId, path: '/profile'
        //     })
        //     if(newEvent){
        //         form.reset()
        //         router.push(`/events/${newEvent.id}`)
        //     }

        // } catch (error) {
        //     console.log(error)
        // }
    }

  return (

    <Form {...form}>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div className='flex flex-col gap-5 md:flex-row'>

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

            </div>

            <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className='button col-span-2 w-full'>
                {form.formState.isSubmitting ? ('Submitting...') : `Create`}
            </Button>
        </form>

    </Form>

  )
}

export default AlertForm
'use server'

import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types"
import { handleError } from "../utils"
import prisma from '../prisma';
import { revalidatePath } from "next/cache";
import {sendEmail} from '../SendAlerts'

export const createEvent = async ({event, userId, path}: CreateEventParams) => {

    try {

        const lister = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        })

        if(!lister){
            throw new Error("User not found")
        }

        const newEvent = await prisma.event.create({
            data: {
                userId: userId,
                title: event.title,
                description: event.description,
                address: event.address,
                city: event.city,
                imageUrl: event.imageUrl,
                status : event.status,
                category: event.category
            }
        })


        const EventCategory = event.category
        const EventCity = event.city
        
        const alertData = await prisma.alert.findMany({
            where: {
              category: EventCategory,
              city: EventCity
            }
        });

        const userIds = alertData.map(alert => alert.userId);

        const userData = await prisma.user.findMany({
            where: {
                clerkId: {
                    in: userIds
                }
            }
        });

        console.log("newEvent", newEvent)
        console.log("userData", userData)
        console.log("alertData", alertData)

        const url = "https://event-app-nextjs-14-4.vercel.app"

        const subject = "New Lists in your area";
        const payload = `${url}/events/${newEvent.id}`;

        userData.forEach(async user => {
        const email = user.email;
            await sendEmail({ subject, email, payload });
        });

        return JSON.parse(JSON.stringify(newEvent))


    } catch (error) {
        console.log("erroe", error)
        handleError(error)
    }


}

export async function updateEvent({ userId, event, path }: UpdateEventParams) {
    try {
  
      const eventToUpdate = await prisma.event.findUnique({
        where: {
            id: event.id
        }
      })
      if (!eventToUpdate || eventToUpdate.userId !== userId) {
        throw new Error('Unauthorized or event not found')
      }
  
        const updatedEvent = await prisma.event.update({
                where: {
                    id: event.id,
                },
                data: {
                    userId: userId,
                    title: event.title,
                    description: event.description,
                    address: event.address,
                    city: event.city,
                    imageUrl: event.imageUrl,
                    status : event.status,
                    category: event.category
                }
            }
        )

      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
      handleError(error)
    }
}
  
export const getEventById = async (eventId: any)=> {
    try{

        const eventData = await prisma.event.findUnique({
            where: {
                id: JSON.parse(eventId),
            },
        })

        const eventUser = await prisma.user.findUnique({
            where: {
                clerkId: eventData?.userId,
            },
        })

        if(!eventData){
            throw new Error("Event Not Found")
        }

        const event = {
            event: eventData,
            eventUser: eventUser
        }

        return JSON.parse(JSON.stringify(event))

    }catch (error) {
        handleError(error)
    }
}

export const getAllEvents = async ({query, limit = 6, page, category}: GetAllEventsParams)=> {
    try{
        

        let eventData;

        if (query && query.trim() !== "" && category) {
            eventData = await prisma.event.findMany({
                where: {
                    AND: [
                        {
                            title: {
                                contains: query.trim()
                            }
                        },
                        {
                            category: category
                        }
                    ]
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
        });
        }else if(query && query.trim() !== "" && !category){
            eventData = await prisma.event.findMany({
                where: {
                    title: {
                        contains: query.trim()
                    }    
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
        });
        }
        else if(category) {
            eventData = await prisma.event.findMany({
                where: {
                    category: category
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            });
        }else if(!category){
            eventData = await prisma.event.findMany({
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            })
        }
        console.log("eventData", eventData)

        if(!eventData){
            throw new Error("Event Not Found")
        }

        const eventsWithUser = await Promise.all(eventData.map(async (event) => {
            const user = await prisma.user.findUnique({
                where: {
                    clerkId: event.userId,
                },
            });
            return { ...event, user };
        }));

        const eventsCount = await prisma.event.count()


        return {
            data: eventsWithUser,
            totalPages: Math.ceil(eventsCount / limit),
        };

    }catch (error) {
        handleError(error)
    }
}

export const deleteEvent = async ({eventId, path}: DeleteEventParams)=> {

    try {

        const deleteEvent = await prisma.event.delete({
            where: {
                id: eventId,
            },
        })

        if(deleteEvent) revalidatePath(path)
        
    } catch (error) {
        
    }

}

export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
    try {
  
      const eventData = await prisma.event.findMany({
        where: {
            userId: userId
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit, 
    });

    const eventsWithUser = await Promise.all(eventData.map(async (event) => {
        const user = await prisma.user.findUnique({
            where: {
                clerkId: event.userId,
            },
        });
        return { ...event, user };
    }));
  
      const eventsCount = await prisma.event.count()
  
      return { data: JSON.parse(JSON.stringify(eventsWithUser)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
      handleError(error)
    }
}

export async function getRelatedEventsByCategory({ category, eventId, limit = 6, page = 1 }: GetRelatedEventsByCategoryParams) {
    try {
  
      const eventData = await prisma.event.findMany({
        where: {
            category: category,
            NOT: {
                id: eventId
            }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit, 
    });

    const eventsWithUser = await Promise.all(eventData.map(async (event) => {
        const user = await prisma.user.findUnique({
            where: {
                clerkId: event.userId,
            },
        });
        return { ...event, user };
    }));
  
      const eventsCount = await prisma.event.count()
  
      return { data: JSON.parse(JSON.stringify(eventsWithUser)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
      handleError(error)
    }
}
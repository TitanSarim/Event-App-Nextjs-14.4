'use server'

import { CreateEventParams, GetAllEventsParams } from "@/types"
import { handleError } from "../utils"
import prisma from '../prisma';


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
                imageUrl: event.imageUrl,
                status : event.status,
                category: event.category
            }
        })

        return JSON.parse(JSON.stringify(newEvent))


    } catch (error) {
        console.log("erroe", error)
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


        const eventData = await prisma.event.findMany({
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit, 
        });

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
'use server'

import { CreateEventParams } from "@/types"
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
'use server'

import { handleError } from "../utils"
import prisma from '../prisma';
import { CreateAlertParams, DeleteAlertParams, GetAlertsByUserParams } from "@/types";


export const createAlert = async ({alert, userId}: CreateAlertParams) => {

    try {

        const lister = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        })

        if(!lister){
            throw new Error("User not found")
        }

        const newAlert = await prisma.alert.create({
            data: {
                userId: userId,
                city: alert.city,
                category: alert.category
            }
        })

        return JSON.parse(JSON.stringify(newAlert))


    } catch (error) {
        console.log("error", error)
        handleError(error)
    }


}

export const deleteAlert = async ({alertId}: DeleteAlertParams) => {

    try {

        await prisma.alert.delete({
            where: {
                id: alertId,
            },
        })

        const message = {
            success: true,
            message: "Alert Deleted",
        }
        return JSON.parse(JSON.stringify(message))

    } catch (error) {
        console.log("error", error)
        handleError(error)
    }


}

export const getAllAlerts = async ({userId}: GetAlertsByUserParams) => {

    try {

        const alertData = await prisma.alert.findMany({
            where: {
                userId: userId
            }
        })

        return { data: JSON.parse(JSON.stringify(alertData))}

        
    } catch (error) {
        console.log("error", error)
        handleError(error)
    }


}
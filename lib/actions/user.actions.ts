'use server'

import { CreateUserParams, UpdateUserParams } from "@/types"
import { handleError } from "../utils"
import prisma from '../prisma';


export const createUser = async (userData: CreateUserParams) => {


    try {

        const newUser = await prisma.user.create({
            data: {
                clerkId: userData.clerkId,
                email: userData.email,
                username: userData.username,
                firstName: userData.firstName,
                lastname: userData.lastname,
                photo: userData.photo
            }
        });

        console.log("newUser", newUser)


        return JSON.parse(JSON.stringify(newUser));
        
    } catch (error) {
        handleError(error)
    }

}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {

    try {

        const updatedUser = await prisma.user.update({
            where: {
                clerkId: clerkId 
            },
            data: user 
        });

        return JSON.parse(JSON.stringify(updatedUser));
        
    } catch (error) {
        handleError(error)
    }

}

export async function getUserById(userId: number) {
    try {
  
        const user = await prisma.user.findUnique({
            where: {
                id: userId 
            }
        });
  
      if (!user) throw new Error('User not found')
      return JSON.parse(JSON.stringify(user))
    } catch (error) {
      handleError(error)
    }
}
  
export const deleteUser = async (clerkId: string) => {

    try {

        await prisma.user.delete({
            where: {
                clerkId: clerkId 
            }
        });
        
    } catch (error) {
        handleError(error)
    }

}
import * as z  from "zod"

export const eventFormSchema = z.object({
    
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be at less then 400 characters'),
    address: z.string().min(3, 'Location must be at least 3 characters').max(200, 'Location must be at less then 200 characters'),
    imageUrl: z.string(),
    category: z.string(),
    status: z.string(),
  })
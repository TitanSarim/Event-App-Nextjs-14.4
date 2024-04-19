// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    email: string
    username: string
    firstName: string
    lastname: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastname: string
    username: string
    photo: string
  }
  
  // ====== EVENT PARAMS
  export type CreateEventParams = {
    userId: number
    event: {
      title: string
      description: string
      address: string
      imageUrl: string
      status: string
      url: string
      categoryId: number
    }
    path: string
  }
  
  export type UpdateEventParams = {
    userId: number
    event: {
      id: number
      title: string
      description: string
      address: string
      imageUrl: string
      status: string
      url: string
      categoryId: number
    }
    path: string
  }
  
  export type DeleteEventParams = {
    eventId: number
    path: string
  }
  
  export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetEventsByUserParams = {
    userId: number
    limit?: number
    page: number
  }
  
  export type GetRelatedEventsByCategoryParams = {
    categoryId: number
    eventId: number
    limit?: number
    page: number | string
  }
  
  export type Event = {
    id: number
    userId: number
    title: string
    description: string
    address: string
    imageUrl: string
    status: string
    url: string
    categoryId: number
    category: {
      id: number
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: number }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  
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
    userId: string
    event: {
      title: string
      description: string
      address: string
      imageUrl: string
      status: string
      category: string
    }
    path: string
  }
  
  export type UpdateEventParams = {
    userId: string
    event: {
      id: number
      title: string
      description: string
      address: string
      imageUrl: string
      status: string
      category: string
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
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedEventsByCategoryParams = {
    category: string
    eventId: number
    limit?: number
    page: number | string | any
  }
  
  export type Event = {
    id: number
    userId: string
    title: string
    description: string
    address: string
    imageUrl: string
    status: string
    category: string,
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
  
import React from 'react'
import Card from './Card'
import Pagination from './Pagination'


type CollectionProps = {
    data: any,
    emptyTitle: string,
    emptyStateSubText: string,
    collectionType?: any, 
    limit: number,
    page: number | string,
    totalPages?: any,
    urlParamName?: string
}


const Collection = ({data, emptyTitle, emptyStateSubText, collectionType, limit, page, totalPages, urlParamName}: CollectionProps) => {
    
    
    return (
    <>
        {data.length > 0 ? (
            <div className='flex flex-col items-center gap-10'>
                <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
                    {data.map((event: any) => {
                        return (
                            <li key={event.id} className='flex justify-center'>
                                <Card event={event}/>
                            </li>
                        )
                    })}
                </ul>
                {totalPages > 1 && (
                    <Pagination urlParamName={urlParamName} totalPages={totalPages} page={page}/> 
                )}
            </div>
        ): (
            <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center'>
                <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
                <p className='p-regular-14'>{emptyStateSubText}</p>
            </div>
        )}
    </>
  )
}

export default Collection

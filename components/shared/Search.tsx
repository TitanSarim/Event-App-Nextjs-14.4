'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SearchIcon from '../../public/assets/icons/search.svg'
import { Input } from '../ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Search = ({placeholder = "Search title..."}: {placeholder?: string}) => {

    const [query, setQuery] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const delayDeboundFn = setTimeout(() => {
            let newUrl
            if(query){
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query
                })
            }else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query']
                })
            }
            router.push(newUrl, {scroll: false})
        }, 300)
        return () => clearTimeout(delayDeboundFn)
    }, [query, searchParams, router])

  return (
    <div className='flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
        <Image src={SearchIcon} alt='Search'width={24} height={24}/>
        <Input type='text' placeholder={placeholder} onChange={(e) => setQuery(e.target.value)} className='p-regular-16 border-0 bg-gray-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'/>
    </div>
  )
}

export default Search
'use client'
import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const CategoriesObject = [
    { "id": 1, "name": "Refrigerators" },
    { "id": 2, "name": "Washing Machines" },
    { "id": 3, "name": "Microwaves" },
    { "id": 4, "name": "Dishwashers" },
    { "id": 5, "name": "Ovens" },
    { "id": 6, "name": "Cooktops" },
    { "id": 7, "name": "Blenders" },
    { "id": 8, "name": "Toasters" },
    { "id": 9, "name": "Coffee Makers" },
    { "id": 10, "name": "Food Processors" },
    { "id": 11, "name": "Juicers" },
    { "id": 12, "name": "Mixer Grinders" },
    { "id": 13, "name": "Air Conditioners" },
    { "id": 14, "name": "Heaters" },
    { "id": 15, "name": "Fans" },
    { "id": 16, "name": "Vacuum Cleaners" },
    { "id": 17, "name": "Water Heaters" },
    { "id": 18, "name": "Ironing Systems" },
    { "id": 19, "name": "Air Purifiers" },
    { "id": 20, "name": "Water Purifiers" },
    { "id": 21, "name": "Other" }
];


const CategoryFilter = () => {

    const [categories, setCategories] = useState<any>(CategoriesObject)
    const router = useRouter()
    const searchParams = useSearchParams()

    const onSelectCategory = (category: string) => {
        let newUrl
        if(category && category!== 'All'){
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        }else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }
        router.push(newUrl, {scroll: false})
    }


  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="select-field select-value">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value='All'  className="select-item p-regular-14">All</SelectItem>
            {categories.length > 0 && categories.map((category: any) => (
                <SelectItem key={category.id} value={category.name} className="select-item p-regular-14">
                    {category.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default CategoryFilter
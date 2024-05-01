import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CitiesObject } from './AustraliaTownsAndCity'


type DropDownProps = {
    value: string,
    onChangeHandler?: () => void
}

const SelectCity = ({onChangeHandler, value }: DropDownProps) => {

    const [categories, setCategories] = useState<any>(CitiesObject)


  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field select-value">
            <SelectValue placeholder="City or Town" />
        </SelectTrigger>
        <SelectContent>
            {categories.length > 0 && categories.map((category: any) => (
                <SelectItem key={category.id} value={category.name} className="select-item p-regular-14">
                    {category.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default SelectCity
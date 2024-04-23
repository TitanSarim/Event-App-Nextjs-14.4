import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"

const CategoriesObject = [
    { "id": 1, "name": "Available" },
    { "id": 2, "name": "Taken" },
]

type DropDownProps = {
    value: string,
    onChangeHandler?: () => void
}

const StatusDropDown = ({onChangeHandler, value }: DropDownProps) => {

    const [categories, setCategories] = useState<any>(CategoriesObject)

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field select-value">
            <SelectValue placeholder="Status" />
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

export default StatusDropDown
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"

type DropDownProps = {
    value: string,
    onChangeHandler?: () => void
}

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

const DropDown = ({onChangeHandler, value }: DropDownProps) => {

    const [categories, setCategories] = useState<any>(CategoriesObject)


  return (
    
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field select-value">
            <SelectValue placeholder="Category" />
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

export default DropDown
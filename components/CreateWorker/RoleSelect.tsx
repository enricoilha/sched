import { FieldError, FieldValues, FieldPath, ControllerProps, Controller } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  type SelectProps = {
    error?: FieldError
    onChange: any
    onBlur: any
    value: string
    title: string
  }
  

export const RoleSelect: React.FC<SelectProps> = ({error, onBlur, onChange, value, title}) => {

    return (
        <div className="w-full flex flex-col relative gap-3 pb-5" >
          <p className="text-gray-700 font-light">{title}</p>

            <Select onValueChange={onChange} defaultValue={value} >
            <SelectTrigger onBlur={onBlur} className={`h-9 w-full bg-white rounded-md outline outline-[.5px] outline-gray-300 focus-within:outline-gray-500 focus-within:outline-[.5px] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-300 px-2 duration-100 font-light text-gray-800 text-sm shadow-sm ${
          error ? "outline-red-500" : ""
        }`}>
                <SelectValue  />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
                
            </Select>
            <p className="text-red-500 font-light absolute -bottom-1">
            {error?.message}
          </p>
          </div>

    )
}
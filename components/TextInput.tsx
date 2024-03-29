import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  register?: any
  error?: FieldError
}

export const TextInput = ({ title, register, error, ...rest }: InputProps) => {
  return (
    <div className=" flex flex-col relative w-full  pb-5">
      <p className="text-gray-600 font-medium text-sm mb-1">{title}</p>

      <input
        {...rest}
        className={`h-9 w-full bg-white rounded-md outline outline-[.5px] outline-gray-400 focus-within:outline-gray-500 focus-within:outline-[.5px] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-200 px-2 duration-100 font-light text-gray-800 text-sm shadow-sm ${error ? "outline-red-500" : ""
          }`}
        {...register}
      />

      <p className="text-red-500 font-light absolute -bottom-1 text-sm">
        {error?.message}
      </p>
    </div>
  )
}

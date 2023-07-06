import { InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  register?: any
  error?: FieldError
}

export const NumberInput = ({ title, register, error, ...rest }: InputProps) => {
  return (
    <div className="w-full flex flex-col relative  pb-5">
      <p className="text-gray-600 font-medium text-sm mb-1">{title}</p>

      <input
        {...rest}
        type="number"
        className={`h-9 w-full bg-white rounded-md outline outline-[.5px] outline-gray-400 focus-within:outline-gray-500 focus-within:outline-[.5px] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-200 px-2 duration-100 font-light text-gray-800 text-sm shadow-sm ${
          error ? "outline-red-500" : ""
        }`}
        {...register}
      />

      <p className="text-red-500 font-light absolute -bottom-1 text-sm">
        {error?.message}
      </p>
    </div>
  )
}

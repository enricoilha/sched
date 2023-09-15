import { useState } from "react"
import { BsCheck } from "react-icons/bs"

export const RowSelectionComponent = ({ ...props }) => {
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <label className="relative cursor-pointer">
      <input
        type={"checkbox"}
        {...props}
        onClick={() => setSelected(!selected)}
        className={`form-check-input flex h-4 w-4 cursor-pointer appearance-none items-center justify-center rounded-md border border-gray-400 duration-100 checked:bg-green-600 focus:ring-2 ring-green-300 focus:ring-offset-1`}
      />
      <BsCheck size={16} color="#fff" className="absolute inset-0 " />
    </label>
  )
}

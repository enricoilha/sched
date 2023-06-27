import { FieldError } from "react-hook-form";

interface InputProps {
  title: string;
  register: any;
  error?: FieldError;
}

export const SexInput = ({ title, register, error }: InputProps) => {
  return (
    <div className="w-full flex flex-col relative pb-5">
      <p className="text-gray-600 font-medium mb-1 text-sm">{title}</p>

      <select
        className={`h-9 w-full bg-white rounded-md outline outline-[.5px] outline-gray-400 focus-within:outline-black focus-within:outline-[.5px] focus-within:ring-emerald-200 px-2 duration-100 focus-within:ring-2 focus-within:ring-offset-2 font-light text-gray-800 text-sm shadow-sm ${
          error ? "outline-red-500" : ""
        }`}
        name=""
        id=""
        {...register}
      >
        <option value="" defaultChecked>
          Selecione um campo
        </option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
      </select>

      <p className="text-red-500 font-light absolute -bottom-1">
        {error?.message}
      </p>
    </div>
  );
};

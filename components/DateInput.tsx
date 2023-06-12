import InputMask from "react-input-mask";
import { FieldError } from "react-hook-form";

interface DateErrors {
  day?: FieldError;
  month?: FieldError;
  year?: FieldError;
}

interface InputProps {
  title: string;
  registerDay: any;
  registerMonth: any;
  registerYear: any;
  error?: DateErrors;
}

export const DateInput = ({
  title,
  registerDay,
  registerMonth,
  registerYear,
  error,
}: InputProps) => {
  return (
    <div className="w-fit flex flex-col relative gap-3 pb-5">
      <p className="text-gray-700 font-light">{title}</p>

      <div className="flex items-center gap-x-3 ">
        <input
          {...registerDay}
          type="text"
          className={`h-9 w-9 bg-white rounded-md outline outline-[.5px] outline-gray-300 focus-within:outline-black focus-within:outline-[.5px] focus-within:ring-emerald-300 focus-within:ring-2 focus-within:ring-offset-2 px-2 duration-100 text-center font-light text-gray-800 text-sm shadow-sm ${
            error ? "outline-red-500" : ""
          }`}
        />
        <input
          {...registerMonth}
          type="text"
          className={`h-9 w-9 bg-white rounded-md outline outline-[.5px] outline-gray-300 focus-within:outline-black focus-within:outline-[.5px] focus-within:ring-emerald-300 focus-within:ring-2 focus-within:ring-offset-2 px-2 duration-100 text-center font-light text-gray-800 text-sm shadow-sm ${
            error ? "outline-red-500" : ""
          }`}
        />
        <input
          {...registerYear}
          type="text"
          className={`h-9 w-20 bg-white rounded-md outline outline-[.5px] outline-gray-300 focus-within:outline-black focus-within:outline-[.5px] focus-within:ring-emerald-300 focus-within:ring-2 focus-within:ring-offset-2 px-2 duration-100 text-center font-light text-gray-800 text-sm shadow-sm ${
            error ? "outline-red-500" : ""
          }`}
        />
      </div>

      <p className="text-red-500 font-light absolute -bottom-1">
        {error?.day?.message || error?.month?.message || error?.year?.message
          ? error?.day?.message || error?.month?.message || error?.year?.message
          : null}
      </p>
    </div>
  );
};

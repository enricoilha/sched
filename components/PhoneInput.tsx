import InputMask from "react-input-mask";
import { FieldError, FieldErrorsImpl } from "react-hook-form";

type PhoneProps = { ddd: FieldError; phoneNumber: FieldError };

type InputProps = {
  title: string;
  registerPhoneNumber: any;
  registerPhoneDDD: any;
  error?: any;
};

export const PhoneInput = ({
  registerPhoneNumber,
  registerPhoneDDD,
  title,
  error,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col relative gap-3 pb-5">
      <p className="text-gray-700 font-light">{title}</p>

      <div className="flex items-center gap-x-2">
        <input
          type="text"
          className={`h-9 w-9 bg-white rounded-md outline outline-[.5px] outline-gray-300 focus-within:outline-black focus-within:outline-[.5px] focus-within:ring-emerald-300 focus-within:ring-2 focus-within:ring-offset-2 flex justify-center text-center duration-100 font-light text-gray-800 text-sm shadow-sm ${
            error ? "outline-red-500" : ""
          }`}
          {...registerPhoneDDD}
        />

        <input
          type="text"
          className={`h-9 w-36 bg-white rounded-md outline outline-[.5px] outline-gray-300 focus-within:outline-black focus-within:outline-[.5px] focus-within:ring-emerald-300 focus-within:ring-2 focus-within:ring-offset-2 px-2 duration-100 font-light text-gray-800 text-sm shadow-sm ${
            error ? "outline-red-500" : ""
          }`}
          {...registerPhoneNumber}
        />
      </div>

      <p className="text-red-500 font-light absolute -bottom-1">
        {error?.ddd?.message || error?.phoneNumber?.message
          ? error?.ddd?.message || error?.phoneNumber?.message
          : null}
      </p>
    </div>
  );
};

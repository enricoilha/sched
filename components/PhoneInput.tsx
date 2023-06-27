import { FieldError } from "react-hook-form";


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
    <div className="w-full flex flex-col relative  pb-5">
      <p className="text-gray-600 font-medium text-sm mb-1">{title}</p>

      <div className="flex items-center gap-x-2">
        <input
          type="text"
          className={`h-9 w-9 bg-white rounded-md outline outline-[.5px] outline-gray-400 focus-within:outline-black focus-within:outline-[.5px] focus-within:ring-emerald-200 focus-within:ring-2 focus-within:ring-offset-2 flex justify-center text-center duration-100 font-light text-gray-800 text-sm shadow-sm ${
            error ? "outline-red-500" : ""
          }`}
          {...registerPhoneDDD}
        />

        <input
          type="text"
          className={`h-9 w-36 bg-white rounded-md outline outline-[.5px] outline-gray-400 focus-within:outline-black focus-within:outline-[.5px] focus-within:ring-emerald-200 focus-within:ring-2 focus-within:ring-offset-2 px-2 duration-100 font-light text-gray-800 text-sm shadow-sm ${
            error ? "outline-red-500" : ""
          }`}
          {...registerPhoneNumber}
        />
      </div>

      <p className="text-red-500 font-light absolute -bottom-1 w-full text-[0.8rem]">
        {error?.ddd?.message || error?.phoneNumber?.message
          ? error?.ddd?.message || error?.phoneNumber?.message
          : null}
      </p>
    </div>
  );
};

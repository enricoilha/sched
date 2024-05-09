import { FieldError } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceType } from "@/types/service";
import { Database } from "@/types/supabase";
import { Clock } from "lucide-react";

type SelectProps = {
  error?: FieldError;
  onChange: any;
  onBlur: any;
  value: string;
  title: string;
  options?: Database["public"]["Tables"]["services"]["Row"][];
};

export const ServicesSelect: React.FC<SelectProps> = ({
  error,
  onBlur,
  onChange,
  value,
  title,
  options,
}) => {
  return (
    <div className="relative flex w-full flex-col pb-5">
      <p className="mb-1 text-sm font-medium text-gray-600">{title}</p>

      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger
          onBlur={onBlur}
          className={`h-9 w-full rounded-md bg-white px-2 text-sm font-light  text-gray-800 shadow-sm outline outline-[.5px] outline-gray-400 duration-100 focus-within:outline-[.5px] focus-within:ring-2 focus-within:ring-emerald-200 focus-within:ring-offset-2 ${
            error ? "outline-red-500" : ""
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((item, index) => (
            <SelectItem value={item.id} key={index}>
              <div className="flex items-center gap-x-2">
                {item.service_name} <Clock size={14} /> {item.duration} min
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="absolute -bottom-1 font-light text-red-500">
        {error?.message}
      </p>
    </div>
  );
};

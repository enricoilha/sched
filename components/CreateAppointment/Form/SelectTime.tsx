import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { ChevronDown } from "lucide-react";
import { FieldError } from "react-hook-form";

interface SelectHoursProps {
  onChange: any;
  title: string;
  value: string;
  onBlur: any;
  error?: FieldError;
  options: any[];
}

export function SelectTime({
  error,
  onBlur,
  onChange,
  options,
  title,
  value,
}: SelectHoursProps) {
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
          <ScrollArea className="relative h-32">
            {options?.map((item, index) => (
              <SelectItem key={`ItemSelectHourKey-${index}`} value={item}>
                {item}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <p className="absolute -bottom-1 font-light text-red-500">
        {error?.message}
      </p>
    </div>
  );
}

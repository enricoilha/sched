import { useAtom } from "jotai";
import { DateAtom } from "@/atoms/date";

export function useDate() {
  return useAtom(DateAtom);
}

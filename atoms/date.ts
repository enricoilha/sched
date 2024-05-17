import dayjs from "dayjs";
import { atomWithReset } from "jotai/utils";

export interface DateAtomProps {
  day: any;
  month: any;
  year: any;
}

export const DateAtom = atomWithReset<DateAtomProps>({
  day: dayjs().date(),
  month: dayjs().month(),
  year: dayjs().year(),
});

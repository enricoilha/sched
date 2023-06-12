import { atom } from "jotai"
import dayjs from "dayjs"

interface DateAtomProps {
    day: any;
    month: any;
    year: any

}


export const DateAtom = atom<DateAtomProps>({
    day: dayjs().date(),
    month: dayjs().month(),
    year: dayjs().year()})
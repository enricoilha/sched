import { atom } from "jotai";
import { ReactNode, RefObject } from "react";

interface SidesectionAtomProps {
  isOpen: boolean;
  children: ReactNode | null;
  buttonRef: RefObject<any> | null
}

export const SidesectionAtom = atom<SidesectionAtomProps>({ isOpen: false, children: null, buttonRef: null});

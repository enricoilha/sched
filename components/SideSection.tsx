"use client";

import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";

import { SidesectionAtom } from "../atoms/sidesection";

interface SideSectionProps {
  children: ReactNode;
}

export const SideSection = ({ children }: SideSectionProps) => {
  const asideRef = useRef<HTMLDivElement>(null);
  const [sidesection, setSidesection] = useAtom(SidesectionAtom);

  const handleClick = (e: any) => {
    if (sidesection.buttonRef?.current) {
      if (
        asideRef.current &&
        !asideRef.current.contains(e.target) &&
        !sidesection.buttonRef.current.contains(e.target)
      ) {
        return setSidesection((content) => ({ ...content, isOpen: false }));
      }
    } else {
      if (asideRef.current && !asideRef.current.contains(e.target)) {
        return setSidesection((content) => ({ ...content, isOpen: false }));
      }
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <motion.div
      key={"sidecontainer"}
      className="fixed left-0 top-0 z-50 h-screen w-screen bg-white/70 backdrop-blur-0"
      transition={{
        duration: 0.6,
      }}
    >
      <AnimatePresence>
        {sidesection.isOpen && (
          <motion.div
            key="aisdjsaiodjasoidsja"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              ease: "easeIn",
              type: "tween",
              duration: 0.2,
            }}
            className="absolute right-0 flex h-screen w-full max-w-[800px] items-center bg-white p-3 shadow-xl"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

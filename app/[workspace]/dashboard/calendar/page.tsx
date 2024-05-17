"use client";

import { SidesectionAtom } from "@/atoms/sidesection";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";

import { ScheduleBackground } from "@/components/Schedule/ScheduleBackground";
import { ScheduleHeader } from "@/components/Schedule/ScheduleHeader";
import { SideSection } from "@/components/SideSection";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useDate } from "@/hooks/useDate";
import dayjs from "dayjs";

export default function CalendarPage() {
  const supabase = createClientComponentClient<Database>();
  const [sidesection] = useAtom(SidesectionAtom);
  const [date] = useDate();
  const { data, error, refetch } = useQuery({
    queryKey: ["Calendar"],
    queryFn: async () => {
      const dateFrom = dayjs(new Date(date.year, date.month, date.day))
        .hour(0)
        .minute(0)
        .toISOString();

      const dateTo = dayjs(new Date(date.year, date.month, date.day))
        .add(4, "day")
        .hour(23)
        .minute(59)
        .toISOString();

      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .gte("date", dateFrom)
        .lte("date", dateTo);

      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [date]);

  return (
    <>
      <main className="flex h-screen flex-col bg-white">
        <ScheduleHeader />
        <div className="h-[90vh] overflow-auto  p-3 pb-0">
          <ScheduleBackground appointments={data} />
        </div>
      </main>
      <AnimatePresence>
        {sidesection.isOpen && (
          <SideSection>{sidesection.children}</SideSection>
        )}
      </AnimatePresence>
    </>
  );
}

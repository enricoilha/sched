import { Database } from "@/types/supabase";
import { CalendarSearch } from "lucide-react";

interface ComponentProps {
  appointments: Database["public"]["Tables"]["appointments"]["Row"][] | [];
}

export function AppointmentsList({ appointments }: ComponentProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-600">
        Agendamentos nessa data
      </p>

      {appointments[0] === undefined ? (
        <div className="mt-3 rounded-lg border bg-gray-50 p-3">
          <div className="flex items-center justify-center gap-x-2">
            <CalendarSearch strokeWidth={1.4} />
            <p className="text-sm">Não há agendamentos para essa data</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

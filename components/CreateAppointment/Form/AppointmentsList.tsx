import { CalendarSearch } from "lucide-react";
import { AppointmentListItemType } from "../Types/AppointmentListItemType";
import dayjs from "dayjs";

interface ListItemProps {
  appointment: AppointmentListItemType;
}

const AppointmentListItem = ({ appointment }: ListItemProps) => {
  return (
    <div className="item-center flex h-7 w-full justify-around rounded-md border bg-gray-50">
      <p className="flex items-center text-sm">
        {appointment.starts_at &&
          dayjs(new Date(appointment.starts_at)).format("HH:mm")}
      </p>
    </div>
  );
};

interface ComponentProps {
  appointments: AppointmentListItemType[] | [] | null;
}

export function AppointmentsList({ appointments }: ComponentProps) {
  return (
    <div className="w-60">
      <p className="mb-3 text-sm font-medium text-gray-600">
        Agendamentos nessa data
      </p>

      {appointments && appointments[0] === undefined ? (
        <div className="mt-3 rounded-lg border bg-gray-50 p-3">
          <div className="flex items-center justify-center gap-x-2">
            <CalendarSearch strokeWidth={1.4} />
            <p className="text-sm">Não há agendamentos para essa data</p>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-y-1">
          {appointments?.map((item, _idx) => (
            <AppointmentListItem
              appointment={item}
              key={`listitemappkey-${_idx}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

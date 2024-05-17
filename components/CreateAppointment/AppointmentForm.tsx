import { WorkspaceAtom } from "@/atoms/workspace";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { z } from "zod";
import { AppointmentSelect } from "./AppointmentSelect";
import { ServicesSelect } from "./ServicesSelect";
import { useResetAtom } from "jotai/utils";
import { DateAtom } from "@/atoms/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { Database } from "@/types/supabase";
import { AppointmentsList } from "./Form/AppointmentsList";
import { AppointmentDatePicker } from "./Form/AppointmentDatePicker";
import dayjs from "dayjs";
import { supabase } from "@/lib/supabase";
import { SelectTime } from "./Form/SelectTime";
import { hours, minutes5in5 } from "@/lib/time";
import { AlarmCheck } from "lucide-react";
import { Clients } from "@/types/clients";
import { useQuery } from "@tanstack/react-query";

interface AppointmentFormProps {
  client: Clients;
}

const FormSchema = z.object({
  professional_id: z
    .string({ required_error: "Campo obrigatório" })
    .uuid({ message: "Insira um profissional válido" }),
  service_id: z
    .string({ required_error: "Campo obrigatório" })
    .uuid({ message: "Insira um serviço válido" }),
  date: z.string({ required_error: "Campo obrigatório" }),
  starts_at_hour: z.string({ required_error: "Campo obrigatório" }),
  starts_at_minute: z.string({ required_error: "Campo obrigatório" }),
});

type FormType = z.infer<typeof FormSchema>;
export function AppointmentForm({ client }: AppointmentFormProps) {
  const resetDate = useResetAtom(DateAtom);
  const [workspace] = useAtom(WorkspaceAtom);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<
    Database["public"]["Tables"]["appointments"]["Row"][] | []
  >([]);
  const [services, setServices] =
    useState<Database["public"]["Tables"]["services"]["Row"][]>();

  const [professionals, setProfessionals] =
    useState<Database["public"]["Tables"]["professionals"]["Row"][]>();

  const { data, error } = useQuery({
    queryKey: ["workspace_appointment"],
    queryFn: async () => {
      if (!workspace?.workspace_id) {
        return;
      }
      const { data, error } = await supabase
        .from("workspaces")
        .select("*, services(*), professionals(*)")
        .eq("id", workspace.workspace_id)
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormType>({
    defaultValues: {
      date: dayjs(new Date()).toISOString(),
    },
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(fields: FormType) {
    if (!workspace?.user) return;

    const dateStarts = dayjs(new Date(fields.date))
      .hour(+fields.starts_at_hour)
      .minute(+fields.starts_at_minute)
      .toISOString();

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        client_id: client.id,
        created_by: workspace?.user.id,
        date: fields.date,
        professional_id: fields.professional_id,
        service_type: fields.service_id,
        starts_at: dateStarts,
        workspace_id: workspace.workspace_id,
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return resetDate();
  }

  const fetchAppointments = async () => {
    if (!workspace?.workspace_id) return console.log("no workspace");
    if (!watch("professional_id"))
      return console.log("No professional selected yet");

    const { data, error } = await supabase
      .from("workspaces")
      .select("appointments!inner(*)")
      .filter("appointments.date", "gte", dayjs(watch("date")).toISOString())
      .filter(
        "appointments.date",
        "lte",
        dayjs(watch("date")).add(23, "hour").add(59, "minute").toISOString(),
      )
      .filter("appointments.professional_id", "eq", watch("professional_id"))
      .eq("id", workspace?.workspace_id);

    if (!data) return;

    if (data[0].appointments) return setAppointments(data[0].appointments);

    return;
  };

  useEffect(() => {
    if (!data) return;
    setProfessionals(data.professionals);
    setServices(data.services);
  }, [data]);

  useEffect(() => {
    fetchAppointments();
  }, [watch("service_id"), watch("date"), watch("professional_id")]);

  return (
    <motion.div
      initial={{ translateY: "50%", opacity: 0.5 }}
      animate={{ translateY: "0%", opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex w-full flex-col justify-center gap-3 "
      >
        <Controller
          control={control}
          name="professional_id"
          render={({ field, fieldState: { error } }) => (
            <AppointmentSelect
              error={error}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              title="Profissional"
              options={professionals}
            />
          )}
        />

        <Controller
          control={control}
          name="service_id"
          render={({ field, fieldState: { error } }) => (
            <ServicesSelect
              error={error}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              title="Serviço"
              options={services}
            />
          )}
        />

        <div className="flex flex-col gap-3 ">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-3 text-sm font-medium text-gray-600">
                Selecione a data
              </p>
              <AppointmentDatePicker
                clickFunction={(x: any) => setValue("date", x)}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <AppointmentsList appointments={appointments} />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium text-gray-600">Horário desejado:</p>
          <div className="mt-3 flex gap-x-10">
            <div className="w-32">
              <Controller
                control={control}
                name="starts_at_hour"
                render={({ field, fieldState }) => (
                  <SelectTime
                    error={fieldState.error}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    //hours
                    options={hours}
                    title="Hora"
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className=" w-32">
              <Controller
                control={control}
                name="starts_at_minute"
                render={({ field, fieldState }) => (
                  <SelectTime
                    error={fieldState.error}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    //hours
                    options={minutes5in5}
                    title="Minuto"
                    value={field.value}
                  />
                )}
              />
            </div>

            <div className="my-auto flex h-full flex-col items-center gap-x-2">
              <AlarmCheck size={20} strokeWidth={1.3} />{" "}
              <p className="text-sm font-light">término</p>
            </div>

            <div
              id="finish_time"
              className="my-auto flex flex-col items-center"
            >
              <div className="flex h-9 w-full items-center rounded-md border bg-gray-50 px-4 text-sm  text-gray-700 shadow-sm outline outline-[.5px] outline-gray-400 duration-100 focus-within:outline-[.5px] focus-within:ring-2 focus-within:ring-emerald-200 focus-within:ring-offset-2">
                {dayjs(new Date())
                  .hour(Number(watch("starts_at_hour")))
                  .minute(Number(watch("starts_at_minute")))
                  .add(
                    Number(
                      services?.find((item) => item.id === watch("service_id"))
                        ?.duration,
                    ),
                    "m",
                  )
                  .format("HH:mm")}
              </div>
            </div>
          </div>
        </div>

        <button
          className="mx-auto w-full rounded-lg bg-emerald-500 px-5 py-2 text-base font-medium text-white duration-100 hover:bg-emerald-400"
          type="submit"
          disabled={submitting && submitting}
        >
          {submitting ? (
            <FiLoader size={24} className="animate-spin" color="#fafafab1" />
          ) : (
            "Criar Agendamento"
          )}
        </button>
      </form>
    </motion.div>
  );
}

import { WorkspaceAtom } from "@/atoms/workspace";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { z } from "zod";
import { AppointmentSelect } from "./AppointmentSelect";
import { ServicesSelect } from "./ServicesSelect";
import { DatepickerComponent } from "../Datepicker";
import { useResetAtom } from "jotai/utils";
import { DateAtom } from "@/atoms/date";
import dayjs from "dayjs";
import { supabase } from "@/lib/supabase";
import { findAvailableTime } from "@/scripts/findAvailableTimes";

interface AppointmentFormProps {}

const dateRegex =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

const FormSchema = z.object({
  room: z
    .number({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  client_id: z
    .string({ required_error: "Campo obrigatório" })
    .uuid({ message: "Insira um cliente válido" }),
  professional_id: z
    .string({ required_error: "Campo obrigatório" })
    .uuid({ message: "Insira um profissional válido" }),
  service_id: z
    .string({ required_error: "Campo obrigatório" })
    .uuid({ message: "Insira um serviço válido" }),
  finishing_at: z
    .string({ required_error: "Campo obrigatório" })
    .regex(dateRegex, { message: "Data não válida" }),
  starting_at: z
    .string({ required_error: "Campo obrigatório" })
    .regex(dateRegex, { message: "Data não válida" }),
});

type FormType = z.infer<typeof FormSchema>;
export function AppointmentForm({}: AppointmentFormProps) {
  const resetDate = useResetAtom(DateAtom);
  const [date, setDate] = useAtom(DateAtom);
  const [workspace] = useAtom(WorkspaceAtom);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { handleSubmit, control, watch } = useForm<FormType>({});

  console.log(
    dayjs()
      .year(date.year)
      .month(date.month)
      .date(date.day)
      .hour(5)
      .toISOString(),
  );

  async function onSubmit(fields: FormType) {
    console.log(fields);
    return resetDate();
  }

  async function calculateProfessionalDisponibility() {
    //const { data , error } = await supabase.from("")
    //divide 60 (hour) by the service duration ex: 60 / 30
    // for 8 to 18

    let hours = new Array();
  }

  useEffect(() => {
    console.log(watch().service_id);
    findAvailableTime(15, date);
  }, [watch().service_id]);

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
              options={workspace?.professionals}
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
              options={workspace?.services}
            />
          )}
        />

        <div className="flex flex-col gap-3 ">
          <p className="text-sm font-medium text-gray-600">Selecione a data</p>
          <DatepickerComponent />
        </div>

        <Controller
          control={control}
          name="service_id"
          render={({ field, fieldState: { error } }) => (
            <ServicesSelect
              error={error}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              title="Horários disponíveis"
              options={workspace?.services}
            />
          )}
        />

        <button
          className="mx-auto w-full rounded bg-emerald-500 px-5 py-2 text-base font-medium text-white duration-100 hover:bg-emerald-600"
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

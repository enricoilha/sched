import { useForm } from "react-hook-form";
import { TextInput } from "../TextInput";
import { RefObject, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseOutline } from "react-icons/io5";
import { RoundedButtons } from "../RoundedButtons";
import { useAtom } from "jotai";
import { SidesectionAtom } from "../../atoms/sidesection";

const FormSchema = z.object({
  service_name: z.string({ required_error: "Campo obrigatório" }),
  description: z.string().optional(),
  duration: z.number({ required_error: "Campo obrigatório" }),
  price: z.number({ required_error: "Campo obrigatório" }),
});

type FormType = z.infer<typeof FormSchema>;

export const CreateService = () => {
  const [sidesection, setSidesection] = useAtom(SidesectionAtom);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({ resolver: zodResolver(FormSchema) });

  const onSubmit = async (fields: FormType) => {
    return console.log(fields);
  };
  return (
    <section className="w-full h-[90vh] overflow-y-auto items-center p-3">
      <header className="w-full flex items-center justify-between">
        <RoundedButtons
          onClick={() =>
            setSidesection((content) => ({ ...content, isOpen: false }))
          }
          icon={<IoCloseOutline size={30} />}
          hoverText="Fechar"
        />
      </header>
      <p className="text-3xl mt-10">Criar Serviço</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-1  w-full justify-center"
      >
        <TextInput
          title="Nome Completo"
          register={{ ...register("service_name") }}
          error={errors?.service_name}
        />

        <TextInput
          title="Email"
          register={{ ...register("description") }}
          error={errors?.description}
        />

        <TextInput
          title="Empresa"
          register={{ ...register("duration", { valueAsNumber: true }) }}
          error={errors?.duration}
        />

        <TextInput
          title="Empresa"
          register={{ ...register("price", { valueAsNumber: true }) }}
          error={errors?.duration}
        />

        <button
          className="bg-gray-800 hover:bg-black duration-100 rounded-md w-44 py-2 mx-auto mt-2 text-white flex items-center justify-center"
          type="submit"
          disabled={submitting && submitting}
        >
          {submitting ? (
            <FiLoader size={24} className="animate-spin" color="#fafafab1" />
          ) : (
            "Criar"
          )}
        </button>
      </form>

      <ToastContainer
        position="bottom-center"
        autoClose={1700}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

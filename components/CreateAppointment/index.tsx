import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WorkspaceAtom } from "@/atoms/workspace";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { ChevronsRight } from "lucide-react";
import { FiLoader } from "react-icons/fi";

import { Clients } from "@/types/clients";
import { supabase } from "@/lib/supabase";

import { SidesectionAtom } from "../../atoms/sidesection";
import { useToast } from "../ui/use-toast";
import { ClientInfos } from "./ClientInfos";
import { CpfForm } from "./cpfForm";
import { AppointmentForm } from "./AppointmentForm";
import { Button } from "../ui/button";

const revalidate = 30; //revalidate every 30 min

export const CreateAppointment: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loadingNewAppointment, setLoadingNewAppointment] =
    useState<boolean>(false);
  const [client, setClient] = useState<Clients | undefined>();
  const [, setSidesection] = useAtom(SidesectionAtom);
  const [workspace] = useAtom(WorkspaceAtom);

  async function fetchNewAppointment() {
    if (!workspace?.workspace_id) return;
    setLoadingNewAppointment(true);
    const professionalsResponse: any = await supabase
      .from("professionals")
      .select("name, id")
      .eq("workspace_id", workspace?.workspace_id);

    if (professionalsResponse.data[0] === undefined) {
      toast({
        title: "Houve um problema",
        description:
          "Não foi possível encontrar profissionais cadastrados no sistema",
        variant: "destructive",
      });
      setLoadingNewAppointment(false);

      setSidesection((state) => ({ ...state, isOpen: false }));
      setLoadingNewAppointment(false);

      return router.replace(
        `/${workspace?.workspace_id}/dashboard/professionals`,
      );
    }
    setLoadingNewAppointment(false);
    return;
  }

  useEffect(() => {
    if (client !== undefined) {
      (async () => await fetchNewAppointment())();
    }
  }, [client]);

  return (
    <motion.div className="h-[98vh] w-full items-center overflow-y-auto p-3">
      <header className="flex w-full items-center justify-between">
        <Button
          variant={"outline"}
          onClick={() =>
            setSidesection((content) => ({ ...content, isOpen: false }))
          }
          className="rounded-md p-2 text-sm font-medium text-neutral-600 duration-100 hover:bg-neutral-100"
        >
          Voltar
        </Button>
      </header>

      <p className="mb-4 mt-5 text-xl font-medium">Criar Agendamento</p>

      {client ? (
        loadingNewAppointment ? (
          <div className="mt-10 flex w-full items-center justify-center">
            <FiLoader size={24} className="animate-spin" color="#121212" />
          </div>
        ) : (
          <>
            <ClientInfos name={client.name} />

            <AppointmentForm client={client} />
          </>
        )
      ) : (
        <CpfForm setClient={(x: any) => setClient(x)} />
      )}
    </motion.div>
  );
};

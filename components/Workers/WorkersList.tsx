import { Worker } from "./Worker";

export const WorkersList = () => {
  return (
    <div className="w-full min-h-12 mt-4">
      <p className="text-base px-1 text-gray-500">Selecione o dentista</p>

      <section className="w-full mt-3 rounded-md flex-col px-1 flex items-center gap-2 overflow-auto">
        <Worker selected />
        <Worker />
      </section>
    </div>
  );
};

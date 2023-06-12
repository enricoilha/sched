interface WorkerProps {
  selected?: boolean;
}

export const Worker = ({ selected }: WorkerProps) => {
  return (
    <div
      className={`w-full rounded  flex  duration-150 cursor-pointer flex-col  ${
        selected ? "font-medium" : "font-light"
      } hover:font-semibold`}
    >
      <div className="text-md text-start w-full flex items-center gap-x-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500" /> Enrico
      </div>
    </div>
  );
};

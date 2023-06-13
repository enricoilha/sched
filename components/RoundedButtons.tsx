import { ReactNode, useState } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  onClick: () => any;
  icon: ReactNode;
  color?: string;
  hoverText: string;
}

export const RoundedButtons = ({
  onClick,
  icon,
  color,
  hoverText,
}: ButtonProps) => {
  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <button
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        backgroundColor: hovering ? (color ? `${color}38` : "#fafafa") : "",
        color,
      }}
      className={`w-12 h-12 rounded-full ${
        color ? "" : "border"
      } flex items-center justify-center duration-150 relative `}
      onClick={onClick}
    >
      {icon}

      {hovering && (
        <div className="absolute mx-auto left-1/2 -translate-x-1/2 rounded bg-gray-700 w-20 h-6 text-center top-[4.4rem] text-sm px-2 text-white flex items-center justify-center">
          {hoverText}
        </div>
      )}
    </button>
  );
};

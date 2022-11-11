import React, { FC, MouseEventHandler } from "react";

interface Props {
  selectedPosition: string | null;
  margin?: string;
  value: string;
  onSelect: MouseEventHandler<HTMLButtonElement>;
}

const PositionBall: FC<Props> = ({
  selectedPosition,
  margin,
  value,
  onSelect,
}) => (
  <button
    onClick={onSelect}
    data-position={value}
    className={`flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 text-sm font-bold  ${margin} ${
      selectedPosition === value
        ? "bg-red-600 text-white shadow-2xl"
        : "bg-white text-pichanga shadow-lg"
    }`}
  >
    {value}
  </button>
);

export default PositionBall;

import React, { FC, MouseEventHandler } from "react";

interface Props {
  margin?: string;
  value: string;
  onSelect: MouseEventHandler<HTMLButtonElement>;
}

const PositionBall: FC<Props> = ({ margin, value, onSelect }) => (
  <button
    onClick={onSelect}
    data-position={value}
    className={`flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 bg-white text-sm font-bold text-pichanga shadow-lg ${margin}`}
  >
    {value}
  </button>
);

export default PositionBall;

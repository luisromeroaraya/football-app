import React, { FC } from "react";

interface Props {
  goals?: number;
  matches?: number;
  fans?: number;
}

const PlayerStats: FC<Props> = ({ goals = 0, matches = 0, fans = 0 }) => (
  <div className="grid w-full grid-cols-3 rounded bg-pichanga p-4 mt-8 text-white">
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold">{goals}</span>
      <span className="text-gray-300">Goals</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold">{matches}</span>
      <span className="text-gray-300">Matches</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold">{fans}</span>
      <span className="text-gray-300">Fans</span>
    </div>
  </div>
);

export default PlayerStats;

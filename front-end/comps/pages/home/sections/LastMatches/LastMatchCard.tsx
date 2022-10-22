import { FC, useState } from "react";
import { IGoal, IMatchTeam } from "../../../../types";
import { faChevronDown, faFutbol } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  teamA: IMatchTeam;
  teamB: IMatchTeam;
}

const GoalList = ({ goals }: { goals: IGoal[] }) => (
  <ul className="w-1/2 flex flex-col">
    {goals.map((goal) => (
      <li className="w-full flex items-center" key={goal.id}>
        <FontAwesomeIcon icon={faFutbol} className="ml-4" />
        <span className="ml-2 font-bold italic">{goal.time}</span>
        <span className="ml-2">{goal.player.name}</span>
      </li>
    ))}
  </ul>
);

const LastMatchCard: FC<Props> = ({ teamA, teamB }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-[calc(100%-2rem)] bg-gray-100 flex flex-col mt-5 rounded">
      <div className="flex text-gray-900 rounded bg-white w-full shadow p-4">
        <div className="w-[20%]">
          <h4>{teamA.name}</h4>
        </div>
        <div className="w-[60%] flex justify-center items-center">
          <span className="font-bold">
            {teamA.goals.length} : {teamB.goals.length}
          </span>
        </div>
        <div className="w-[20%] flex justify-end">
          <h4>{teamB.name}</h4>
        </div>
      </div>
      {isOpen && (
        <div className="w-full flex text-sm text-gray-900 my-4">
          <GoalList goals={teamA.goals} />
          <GoalList goals={teamB.goals} />
        </div>
      )}
      <div className="w-full flex justify-center text-[0.76rem] text-gray-600 my-[0.1rem]" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="transition-transform duration-300 ease-in-out"
          style={{ transform: `rotate(${isOpen ? "180deg" : "0"})` }}
        />
      </div>
    </div>
  );
};

export default LastMatchCard;

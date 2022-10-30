import { FC } from "react";
import { IMatchTeam } from "../../../../types";
import LastMatchCard from "./LastMatchCard";

interface Props {
  date: string;
  time: string;
  teamA: IMatchTeam;
  teamB: IMatchTeam;
}

const LastMatch: FC<Props> = ({ date, teamA, teamB, time }) => {
  return (
    <div className="flex flex-col mt-8 w-full items-center">
      <div className="flex flex-col w-full relative h-6 justify-center">
        <hr />
        <div className="flex w-full h-6 absolute justify-center">
          <span className="bg-pichanga px-3 rounded">
            {date}, {time}
          </span>
        </div>
      </div>
      <LastMatchCard teamA={teamA} teamB={teamB} />
    </div>
  );
};

export default LastMatch;

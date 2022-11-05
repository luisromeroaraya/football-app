import { FC } from "react";
import PositionBall from "./PositionBall";
import PositionRow from "./positionRow";
import fieldBg from "../../../public/assets/img/football-field.jpg";

interface Props {}

const positions = {
  GK: "Goalkeeper",
  CB: "Centre Back",
  RB: "Right Back",
  LB: "Left Back",
  RWB: "Right Wing Back",
  LWB: "Left Wing Back",
  CM: "Centre Midfield",
  CMD: "Centre Midfield Defensive",
  CAM: "Centre Attacking Midfield",
  RM: "Right Midfield",
  LM: "Left Midfield",
  ST: "Striker",
  CF: "Centre Forward",
  RF: "Right Forward",
  LF: "Left Forward",
  RW: "Right Wing",
  LW: "Left Wing",
};

const SelectPosition: FC<Props> = () => {
  const onSelect = (e) => console.log(e.target.getAttribute("data-position"));
  return (
    <div className="absolute top-0 right-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-600/50">
      <div
        className="flex h-[80%] w-[90%] flex-col rounded-lg border bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${fieldBg.src})`,
        }}
      >
        <PositionRow />
        <PositionRow>
          <PositionBall onSelect={onSelect} value="ST" />
        </PositionRow>
        <PositionRow>
          <PositionBall onSelect={onSelect} margin="mr-14" value="LF" />
          <PositionBall onSelect={onSelect} value="CF" />
          <PositionBall onSelect={onSelect} margin="ml-14" value="RF" />
        </PositionRow>
        <PositionRow>
          <PositionBall onSelect={onSelect} margin="mr-28" value="LW" />
          <PositionBall onSelect={onSelect} margin="ml-28" value="RW" />
        </PositionRow>
        <PositionRow>
          <PositionBall onSelect={onSelect} value="CAM" />
        </PositionRow>
        <PositionRow />
        <PositionRow>
          <PositionBall onSelect={onSelect} margin="mr-14" value="LM" />
          <PositionBall onSelect={onSelect} value="CM" />
          <PositionBall onSelect={onSelect} margin="ml-14" value="RM" />
        </PositionRow>
        <PositionRow />
        <PositionRow>
          <PositionBall onSelect={onSelect} margin="mr-24" value="LWB" />
          <PositionBall onSelect={onSelect} margin="mb-10" value="CDM" />
          <PositionBall onSelect={onSelect} margin="ml-24" value="RWB" />
        </PositionRow>
        <PositionRow>
          <PositionBall onSelect={onSelect} margin="mr-14" value="LB" />
          <PositionBall onSelect={onSelect} value="CB" />
          <PositionBall onSelect={onSelect} margin="ml-14" value="RB" />
        </PositionRow>
        <PositionRow>
          <PositionBall onSelect={onSelect} value="GK" />
        </PositionRow>
        <PositionRow />
      </div>
    </div>
  );
};

export default SelectPosition;

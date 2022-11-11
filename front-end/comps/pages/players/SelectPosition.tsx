import { Dispatch, FC, MouseEventHandler, SetStateAction, useRef } from "react";

import PositionBall from "./PositionBall";
import PositionRow from "./PositionRow";
import fieldBg from "../../../public/assets/img/football-field.jpg";
import useClickOutside from "../../hooks/useClickOutside";

interface Props {
  onSelect: MouseEventHandler<HTMLButtonElement>;
  selectedPosition: string | null;
  setIsSelectPositionOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectPosition: FC<Props> = ({
  onSelect,
  selectedPosition,
  setIsSelectPositionOpen,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside({ ref, setToggle: setIsSelectPositionOpen });
  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-600/70">
      <div
        className="flex h-[500px] w-[90%] flex-col rounded-lg border bg-cover bg-center bg-no-repeat"
        ref={ref}
        style={{
          backgroundImage: `url(${fieldBg.src})`,
        }}
      >
        <PositionRow />
        <PositionRow>
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            value="ST"
          />
        </PositionRow>
        <PositionRow>
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="mr-14"
            value="LF"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            value="CF"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="ml-14"
            value="RF"
          />
        </PositionRow>
        <PositionRow>
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="mr-28"
            value="LW"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="ml-28"
            value="RW"
          />
        </PositionRow>
        <PositionRow>
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            value="CAM"
          />
        </PositionRow>
        <PositionRow />
        <PositionRow>
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="mr-14"
            value="LM"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            value="CM"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="ml-14"
            value="RM"
          />
        </PositionRow>
        <PositionRow />
        <PositionRow>
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="mr-24"
            value="LWB"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="mb-10"
            value="CDM"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="ml-24"
            value="RWB"
          />
        </PositionRow>
        <PositionRow>
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="mr-14"
            value="LB"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            value="CB"
          />
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            margin="ml-14"
            value="RB"
          />
        </PositionRow>
        <PositionRow>
          <PositionBall
            selectedPosition={selectedPosition}
            onSelect={onSelect}
            value="GK"
          />
        </PositionRow>
        <PositionRow />
      </div>
    </div>
  );
};

export default SelectPosition;

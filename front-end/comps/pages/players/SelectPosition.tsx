import { FC } from "react";
import fieldBg from "../../../public/assets/img/football-field.jpg";

interface Props {
  onSelect: () => void;
}

const SelectPosition: FC<Props> = ({ onSelect }) => (
  <div className="absolute top-0 right-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-600">
    <div
      className="h-[80%] w-[90%] rounded-lg bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${fieldBg.src})`,
      }}
    >
        
    </div>
  </div>
);

export default SelectPosition;

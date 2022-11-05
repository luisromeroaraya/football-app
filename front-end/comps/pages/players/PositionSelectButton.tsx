import {
    Dispatch,
    FC,
    MouseEventHandler,
    SetStateAction,
    useState
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../../types";
import SelectPosition from "./SelectPosition";
import {
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  value: string | null;
  formData: IUser;
  setFormData: Dispatch<SetStateAction<IUser>>;
}

const PositionSelectButton: FC<Props> = ({ value, formData, setFormData }) => {
  const [isSelectPositionOpen, setIsSelectPositionOpen] = useState(false);
  const onSelect: MouseEventHandler = ({ target }) => {
    setFormData({
      ...formData,
      profile: {
        ...formData.profile,
        position: (target as HTMLDivElement).getAttribute("data-position"),
      },
    });
    setIsSelectPositionOpen(false);
  };
  return (
    <>
      <div className="mt-8 flex flex-col">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Position
        </label>
        <button
          onClick={() => setIsSelectPositionOpen(true)}
          className="mt-2 rounded-xl bg-gray-200 p-3"
        >
          <span className="mr-2 font-bold">{value || "POS"}</span>
          <FontAwesomeIcon className="text-gray-600" icon={faChevronDown} />
        </button>
      </div>
      {isSelectPositionOpen && (
        <SelectPosition
          selectedPosition={value}
          onSelect={onSelect}
          setIsSelectPositionOpen={setIsSelectPositionOpen}
        />
      )}
    </>
  );
};

export default PositionSelectButton;

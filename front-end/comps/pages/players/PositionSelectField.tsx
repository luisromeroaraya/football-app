import {
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../../types";
import SelectPosition from "./SelectPosition";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  value: string | null;
  formData: IUser;
  setFormData: Dispatch<SetStateAction<IUser>>;
}

const PositionSelectField: FC<Props> = ({ value, formData, setFormData }) => {
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
          onClick={(e) => {
            e.preventDefault();
            setIsSelectPositionOpen(true);
          }}
          className="mt-2 flex items-center justify-between rounded-xl bg-gray-200 pl-3 pt-3 pb-3 focus:border-2 focus:border-black focus:outline-none"
        >
          <span>{value || "POS"}</span>
          <FontAwesomeIcon
            className="mr-1 text-[0.6rem] font-extrabold text-black"
            icon={faChevronDown}
          />
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

export default PositionSelectField;

import { FC, ReactNode, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  editMode: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const ComingFromDownContainer: FC<Props> = ({
  editMode,
  onClose,
  children,
  title,
}) => {
  const [transitionClass, setTransitionClass] = useState("translate-y-full");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (editMode) return setTransitionClass("");
      setTransitionClass("translate-y-full");
    }, 100);
    return () => clearTimeout(timer);
  }, [editMode]);

  return editMode ? (
    <div
      className={`absolute top-0 left-0 z-40 min-h-[100vh] w-screen rounded bg-white text-black transition-transform duration-200 ease-in-out ${transitionClass} overflow-scroll`}
    >
      <div className="flex h-[10%] w-full justify-between p-4">
        <div className="w-16"></div>
        <div className="text-2xl font-semibold">
          <h2>{title}</h2>
        </div>
        <div className="flex w-16 justify-end">
          <FontAwesomeIcon icon={faXmark} onClick={onClose} />
        </div>
      </div>
      <div className="flex w-full flex-col px-4">{children}</div>
    </div>
  ) : null;
};

export default ComingFromDownContainer;

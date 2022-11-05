import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

interface Args {
  ref: MutableRefObject<HTMLElement | null>;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

const useClickOutside = ({ ref, setToggle }: Args) => {
  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) =>
      ref.current && !ref.current.contains(target as Node) && setToggle(false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setToggle]);
};
export default useClickOutside;

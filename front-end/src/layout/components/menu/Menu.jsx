import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className="flex w-screen mt-5 h-[50vh] absolute transition-all duration-500 "
      style={{ transform: `translate(${showMenu ? "0" : "86%"})` }}
    >
      <div className="h-full w-1/6">
        <button onClick={() => setShowMenu(!showMenu)} className="w-full h-1/6 rounded-l-md text-gray-900 text-4xl bg-white">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="w-full h-5/6 bg-white rounded-b-md"></div>
    </div>
  );
};

export default Menu;

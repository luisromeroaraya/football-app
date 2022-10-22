import { FC, useState } from "react";
import { faBars, faHouse } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface Props {
  member: {
    id: string;
    name: string;
  };
}

const Navbar: FC<Props> = ({ member }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="fixed w-screen mt-5 flex transition-transform duration-300 ease-in-out z-50"
      style={{ transform: `translate(${isOpen ? "0" : "85%"})` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[15%] bg-white text-black flex items-center justify-center h-14 text-2xl rounded-l"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="w-[85%] bg-white flex flex-col rounded-bl">
        <div className="flex h-14 items-center justify-end text-xl">
          <h2>Hello, {member.name}</h2>
          <Link href="/profile">
            <div className="rounded-full bg-gray-600 h-10 w-10 mx-5"></div>
          </Link>
        </div>
        <ul className="w-full h-60">
          <li className="w-full py-5 text-xl">
            <Link href="/">
              <div className="flex items-center w-full pl-4 py-2">
                <FontAwesomeIcon icon={faHouse} />
                <span className="leading-none ml-2">Home</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

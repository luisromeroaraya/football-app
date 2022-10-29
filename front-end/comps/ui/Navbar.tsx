import { FC, useState } from "react";
import { faBars, faHouse } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Props {
  member: {
    id: string;
    name: string;
  };
}

const Navbar: FC<Props> = ({ member }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { user } = session || {};
  return (
    <div
      className="fixed z-50 mt-5 flex w-screen transition-transform duration-300 ease-in-out"
      style={{ transform: `translate(${isOpen ? "0" : "85%"})` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-[15%] items-center justify-center rounded-l bg-white text-2xl text-black"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="flex w-[85%] flex-col rounded-bl bg-white">
        <div className="flex h-14 items-center justify-end text-xl">
          <h2>Hello, {user?.sub}</h2>
          <Link href="/profile">
            <div className="mx-5 h-10 w-10 rounded-full bg-gray-600"></div>
          </Link>
        </div>
        <ul className="h-60 w-full">
          <li className="w-full py-5 text-xl">
            <Link href="/">
              <div className="flex w-full items-center py-2 pl-4">
                <FontAwesomeIcon icon={faHouse} />
                <span className="ml-2 leading-none">Home</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

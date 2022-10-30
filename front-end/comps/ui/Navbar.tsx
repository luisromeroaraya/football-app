import { FC, useState } from "react";
import {
  faBars,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../types";
import Link from "next/link";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as IUser;

  return (
    <div
      className="fixed z-50 mt-5 flex w-screen text-black transition-transform duration-300 ease-in-out"
      style={{ transform: `translate(${isOpen ? "0" : "85%"})` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-[15%] items-center justify-center rounded-l bg-white text-2xl "
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="flex w-[85%] flex-col rounded-bl bg-white">
        <div className="flex h-14 items-center justify-end text-xl">
          <h2>Hello, {user?.sub}</h2>
          <Link href={`/players/${user?.sub}`}>
            <div className="mx-5 h-10 w-10 rounded-full bg-gray-600"></div>
          </Link>
        </div>
        <ul className="w-full">
          <li className="w-full py-5 text-xl">
            <Link href="/">
              <a className="flex w-full items-center py-2 pl-4">
                <FontAwesomeIcon icon={faHouse} />
                <span className="ml-2 leading-none">Home</span>
              </a>
            </Link>
          </li>
        </ul>
        <div className="flex w-full justify-end">
          <button
            className="mr-5 py-2"
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/login/?signout=true`,
              })
            }
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { FC, ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Navbar from "./Navbar";
import bg from "../../public/assets/img/bg.jpg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  return (
    <div
      className="h-screen w-screen bg-cover bg-fixed bg-no-repeat text-white"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div
        className="h-full w-full bg-pichanga"
        style={{ backgroundColor: "rgb(34 175 83 / 0.9)" }}
      >
        {status === "authenticated" &&
          !router.pathname.includes("/players") && <Navbar />}
        <header className="flex h-[10%] w-full items-center justify-between">
          <div className="w-10 pl-4 text-xl">
            {router.pathname !== "/" && (
              <button onClick={router.back}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold uppercase italic ">
            <Link href="/">Pichanga</Link>
          </h1>
          <div className="w-10"></div>
        </header>
        <main className="flex h-[90%] w-full flex-col overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

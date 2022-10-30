import { FC, ReactNode } from "react";

import Link from "next/link";
import Navbar from "./Navbar";
import bg from "../../public/assets/img/bg.jpg";
import { useSession } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { status } = useSession();
  return (
    <div
      className="h-screen w-screen bg-cover bg-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div
        className="h-full w-full bg-pichanga"
        style={{ backgroundColor: "rgb(34 175 83 / 0.9)" }}
      >
        {status === "authenticated" && <Navbar />}
        <header className="flex h-[10%] w-full items-center justify-center">
          <h1 className="text-2xl font-bold uppercase italic text-white">
            <Link href="/">Pichanga</Link>
          </h1>
        </header>
        <main className="flex h-[90%] w-full flex-col overflow-y-scroll text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

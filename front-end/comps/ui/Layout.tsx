import { FC, ReactNode } from "react";

import Link from "next/link";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-pichanga">
      {router.pathname !== "/login" && <Navbar member={{ id: "1", name: "John" }} />}
      <header className="w-full h-[10%] flex items-center justify-center">
        <h1 className="text-white text-2xl uppercase font-bold italic">
          <Link href="/">Pichangapp</Link>
        </h1>
      </header>
      <main className="w-full flex flex-col h-[90%] overflow-y-scroll text-white">{children}</main>
    </div>
  );
};

export default Layout;

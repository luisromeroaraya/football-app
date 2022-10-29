import { FC, useEffect } from "react";

import Head from "next/head";
import LastMatches from "../comps/pages/home/sections/LastMatches";
import TopScorers from "../comps/pages/home/sections/TopScorers";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Home: FC = () => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status !== "authenticated") router.push("/login");
  }, [status]);
  return (
    <>
      <Head key="head">
        <title>Pichanga</title>
        <meta name="description" content="Pichanga" />
      </Head>
      <LastMatches />
      <TopScorers />
    </>
  );
};

export default Home;

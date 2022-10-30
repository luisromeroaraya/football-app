import { FC } from "react";
import Head from "next/head";
import LastMatches from "../comps/pages/home/sections/LastMatches";
import TopScorers from "../comps/pages/home/sections/TopScorers";
import useSecurePage from "../comps/hooks/useSecurePage";

const Home: FC = () => {
  useSecurePage();
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

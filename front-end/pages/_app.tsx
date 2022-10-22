import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../comps/ui/Layout";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;

import "../styles/globals.css";

import {
  Hydrate,
  QueryClientProvider
} from "@tanstack/react-query";

import type { AppProps } from "next/app";
import type { DehydratedState } from "@tanstack/react-query";
import Layout from "../comps/ui/Layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "../comps/hooks/queries/queryClient";

interface PageProps {
  session: any;
  dehydratedState: DehydratedState;
}

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;

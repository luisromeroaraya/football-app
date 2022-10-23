import "../styles/globals.css";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import type { AppProps } from "next/app";
import type { DehydratedState } from "@tanstack/react-query";
import Layout from "../comps/ui/Layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface PageProps {
  dehydratedState: DehydratedState;
}

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;

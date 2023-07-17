import type { AppProps } from "next/app";

import { Layout } from "@/components";

import "@rookies-team/design/style.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

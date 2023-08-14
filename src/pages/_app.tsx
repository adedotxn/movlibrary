import Layout from "@/components/ui/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UtilityProvider } from "@/utils/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <UtilityProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UtilityProvider>
    </main>
  );
}

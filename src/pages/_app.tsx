import Layout from "@/components/ui/layout";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </QueryClientProvider>
  );
}

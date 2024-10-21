import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "../theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from "@/components/layout/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <ClerkProvider {...pageProps}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ClerkProvider>
    </Provider>
  );
}

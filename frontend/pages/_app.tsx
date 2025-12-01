import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloContextProvider } from "../hooks/ApolloContextProvider";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

type AuthProps = {
  Component: any;
  pageProps: any;
  session: any;
};

function MyApp({ Component, pageProps, session }: AuthProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <Notifications position="top-right" zIndex={2077} />
        <ApolloContextProvider>
          <Component {...pageProps} />
          <Analytics />
        </ApolloContextProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;

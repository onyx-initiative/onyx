import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloContextProvider } from '../hooks/ApolloContextProvider';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

type AuthProps = {
  Component: any;
  pageProps: any;
  session: any;
};

function MyApp({ Component, pageProps, session }: AuthProps) {
  return (
    <SessionProvider session={session}>
      <ApolloContextProvider>
        <Component {...pageProps} />
      </ApolloContextProvider>
    </SessionProvider> 
  )
}

export default MyApp

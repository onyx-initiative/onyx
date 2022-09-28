import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloContextProvider } from '../hooks/ApolloContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloContextProvider>
      <Component {...pageProps} />
    </ApolloContextProvider>
  )
}

export default MyApp

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Layout from '../components/layout';
import Head from 'next/head';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api/graphql',
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=no'
        />
      </Head>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;

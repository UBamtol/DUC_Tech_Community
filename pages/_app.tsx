import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import Layout from '../components/layout';
import Head from 'next/head';
import { RecoilRoot, atom } from 'recoil';
import dynamic from 'next/dynamic';

const Layout = dynamic(
  () => {
    return import('../components/layout/index');
  },
  { ssr: false }
);

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
          <RecoilRoot>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;

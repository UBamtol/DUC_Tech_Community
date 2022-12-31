// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';

type Data = {
  name: string;
};

const apolloServer = new ApolloServer({});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

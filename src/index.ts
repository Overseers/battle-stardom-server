import './util/signale';
import './express/firebase';
import app from './express/app';
import { createServer } from 'http';
import { ApolloServer, gql, AuthenticationError } from 'apollo-server-express';
import admin from 'firebase-admin';
import config from './util/config';

import { resolvers, schema } from './graphql';
import { players, FirebaserUser, session } from './data';
import { v4 } from 'uuid';

const express = app();

const authProvider = async (header: ({ authorization: string; })) => {
    const { authorization = '' } = header;

    if (authorization === '' && config.nodeEnv !== 'dev') {
        throw new Error('Failed to authenticate');
    }

    const firebaseUser: FirebaserUser = config.nodeEnv === 'dev' ? config.firebaseDev : await admin.auth().verifyIdToken(authorization);

    if (!firebaseUser) {
        throw new AuthenticationError('You must be logged in');
    }

    let currentSession = Object.entries(session).find(([key, value]) => {
        return value.firebaseUser.email === firebaseUser.email;
    })?.[1];

    if (!currentSession) {
        return players.registerPlayer({
            firebaseUser,
            sessionCreated: new Date(),
            lastUpdated: new Date(),
            sid: v4()
        });
    }


    return {
        session: currentSession.sid,
        email: firebaseUser.email
    };
};

const gqlServer = new ApolloServer({
    typeDefs: gql(schema),
    //@ts-ignore
    resolvers: resolvers,
    context: async ({ req, connection }) => {
        const authorization: string = req?.headers?.authorization || connection?.context.authorization || '';
        return authProvider(({ authorization: authorization.slice(7) }) as ({ authorization: string; }));
    },

    // subscriptions: '/api/subscriptions'
    subscriptions: {
        path: '/api/subscriptions',
        onConnect: async (connectionParams, webSocket, context) => authProvider(connectionParams as ({ authorization: string; })),
        onDisconnect: async (webSocket, context) => {
            // console.log('Client Disconnected',);
            const session = await context.initPromise;
            players.unregisterPlayer(session);
        }
    }
});

gqlServer.applyMiddleware({ app: express, path: '/api/graphql' });

const server = createServer(express);

gqlServer.installSubscriptionHandlers(server);

server.listen(config.port, () => {
    console.log('Server Online on port:', config.port);
});

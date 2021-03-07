// import './util/signale';
import './express/firebase';
import app from './express/app';
import { createServer } from 'http';
import { ApolloServer, gql, AuthenticationError } from 'apollo-server-express';
import admin from 'firebase-admin';
import config from './util/config';

import { resolvers, schema } from './graphql';
import { players, playerMapping, FirebaserUser } from './data';
import { v4 } from 'uuid';

const express = app();

const gqlServer = new ApolloServer({
    typeDefs: gql(schema),
    resolvers: resolvers,
    context: async ({ req, connection }) => {
        // console.log('test', req.headers);
        //     const token = req?.headers?.authorization || connection?.context.authorization || '';

        //     if ((token === 'Bearer' || token === 'Bearer null' || !token.startsWith('Bearer')) && config.nodeEnv !== 'dev') {
        //         throw new AuthenticationError('Unauthorized');
        //     }

        // const user = config.nodeEnv === 'dev' ? config.firebaseDev : await admin.auth().verifyIdToken(token.split('Bearer ')[1]);

        // if (!user) {
        //     throw new AuthenticationError('You must be logged in');
        // }

        // return {
        //     user
        // };
        return {
            test: 'hello'
        };
    },

    // subscriptions: '/api/subscriptions'
    subscriptions: {
        path: '/api/subscriptions',
        onConnect: async (connectionParams, webSocket, context) => {
            // console.log(connectionParams);
            const { authorization = '' } = connectionParams as ({ authorization: string; });
            const header = context.request.headers.cookie;
            const { id } = header?.split(/[;] */).reduce(function (result: any, pairStr: any) {
                var arr = pairStr.split('=');
                if (arr.length === 2) { result[arr[0]] = arr[1]; }
                return result;
            }, {});
            if (authorization === '' && config.nodeEnv !== 'dev') {
                throw new Error('Failed to authenticate');
            }
            // console.log('Client connected', authorization);
            // pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.playerCount() });
            const firebaseUser: FirebaserUser = config.nodeEnv === 'dev' ? config.firebaseDev : await admin.auth().verifyIdToken(authorization);

            if (!firebaseUser) {
                throw new AuthenticationError('You must be logged in');
            }

            let currentSession = playerMapping.find((entry) => entry.email === firebaseUser.email);

            if (!currentSession) {
                currentSession = players.registerPlayer({
                    firebaseUser,
                    sessionCreated: new Date(),
                    lastUpdated: new Date(),
                    sid: id
                });
            }

            //find game user next

            return currentSession;
            //register clients to iterate over
        },
        onDisconnect: async (webSocket, context) => {
            // console.log('Client Disconnected',);
            const session = await context.initPromise;
            // console.log('session data', session);
            players.unregisterPlayer(session.sessionId);
            // pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.change(-1) });
            //remove clients to iterate over
        }
    }
});

gqlServer.applyMiddleware({ app: express, path: '/api/graphql' });

const server = createServer(express);

gqlServer.installSubscriptionHandlers(server);

server.listen(config.port, () => {
    console.log('Server Online on port:', config.port);
    // SubscriptionServer.create({
    //     execute,
    //     subscribe,
    //     schema: buildSchema(schema)
    // }, {
    //     server,
    //     port: 8081,
    //     path: '/api/subscriptions'
    // });
});


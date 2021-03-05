import './util/signale';
import './express/firebase';
import app from './express/app';
import { createServer } from 'http';
import { ApolloServer, PubSub, gql, AuthenticationError } from 'apollo-server-express';
import admin from 'firebase-admin';
import config from './util/config';
import { v4 as uuid } from 'uuid';

import { resolvers, schema } from './graphql';
import { players, session } from './data';

const express = app();

const gqlServer = new ApolloServer({
    typeDefs: gql(schema),
    resolvers: resolvers,
    // context: async ({ req, connection }) => {
    //     console.log('test');
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
    // },

    // subscriptions: '/api/subscriptions'
    subscriptions: {
        path: '/api/subscriptions',
        onConnect: async (connectionParams, webSocket, context) => {
            const { authorization = '' } = connectionParams as ({ authorization: string; });
            if (authorization === '' && config.nodeEnv !== 'dev') {
                throw new Error('Failed to authenticate');
            }
            // console.log('Client connected', authorization);
            // pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.playerCount() });
            const firebaseUser = config.nodeEnv === 'dev' ? config.firebaseDev : await admin.auth().verifyIdToken(authorization);

            if (!firebaseUser) {
                throw new AuthenticationError('You must be logged in');
            }

            if (!session[firebaseUser.uid]) {
                players.registerPlayer(firebaseUser.uid, {
                    firebaseUser,
                    sessionCreated: new Date(),
                    lastUpdated: new Date()
                });
            }

            //find game user next

            return {
                firebaseUser,
                sessionCreated: new Date(),
                lastUpdated: new Date()
            };
            //register clients to iterate over
        },
        onDisconnect: async (webSocket, context) => {
            console.log('Client Disconnected',);
            const session = await context.initPromise;
            console.log('session data', session);
            players.unregisterPlayer(session.sid);
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

import Weapon from "./logic/items/weapon";
import WeaponModifier from './logic/items/modifier';
import { ModifierReturn } from './logic/entities/modifier';

const weapon = (new Weapon({
    name: 'test',
    description: 'test weapon',
    minDamage: 5,
    maxDamage: 50,
    attackSpeed: 1
}, [new WeaponModifier(50, 50, (damageRoll, min, max): ModifierReturn<{}> => {//this is % increased physical dmg
    console.log('Original dmg roll:', damageRoll, '\nmodifier roll to apply (% increased physical dmg for weapon):', max);
    return {
        value: damageRoll + damageRoll * (max / 100)
    };
})]));

console.log('Final weapon dmg roll:', weapon.modifiedDamageRoll());
console.log('Final weapon dmg roll:', weapon.modifiedDamageRoll());
console.log('Final weapon dmg roll:', weapon.modifiedDamageRoll());
console.log('Final weapon dmg roll:', weapon.modifiedDamageRoll());
console.log('Final weapon dmg roll:', weapon.modifiedDamageRoll());
console.log('Final weapon dmg roll:', weapon.modifiedDamageRoll());
console.log('Final weapon dmg roll:', weapon.modifiedDamageRoll());

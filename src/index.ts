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
import { database } from './postgre';
import { getPlayer } from './postgre/sql';
import Player from './logic/entities/gearedEntity/player';
import GearedEntity from './logic/entities/gearedEntity';
import Weapon from './logic/entities/items/weapon';

const express = app();

const authProvider = async (header: { authorization: string }) => {
    const { authorization = '' } = header;

    if (authorization === '' && config.nodeEnv !== 'dev') {
        throw new Error('Failed to authenticate');
    }

    const firebaseUser: FirebaserUser =
        config.nodeEnv === 'dev' ? config.firebaseDev : await admin.auth().verifyIdToken(authorization);

    if (!firebaseUser) {
        throw new AuthenticationError('You must be logged in');
    }

    const currentSession = Object.entries(session).find(([key, value]) => {
        return value.firebaseUser.email === firebaseUser.email;
    })?.[1];

    const databaseUser = (await database.query(getPlayer, [firebaseUser.email])).rows[0];

    if (!currentSession) {
        let sid: string;
        sid = databaseUser.isloggedin;
        if (!databaseUser.isloggedin) {
            sid = v4();
        }
        const player = new Player(databaseUser.playerdata);
        player.sessionId = sid;
        return await players.registerPlayer({
            firebaseUser,
            sessionCreated: new Date(),
            lastUpdated: new Date(),
            gameUser: player,
            sid,
        });
    }

    return {
        session: currentSession.sid,
        email: firebaseUser.email,
    };
};

const gqlServer = new ApolloServer({
    typeDefs: gql(schema),
    resolvers: resolvers,
    context: async ({ req, connection }) => {
        const authorization: string = req?.headers?.authorization || connection?.context.authorization || '';
        return authProvider({ authorization: authorization.slice(7) } as {
            authorization: string;
        });
    },

    // subscriptions: '/api/subscriptions'
    subscriptions: {
        path: '/api/subscriptions',
        onConnect: async (connectionParams, webSocket, context) =>
            authProvider(connectionParams as { authorization: string }),
        onDisconnect: async (webSocket, context) => {
            // console.log('Client Disconnected',);
            const session = await context.initPromise;
            players.unregisterPlayer(session);
        },
    },
});

gqlServer.applyMiddleware({ app: express, path: '/api/graphql' });

const server = createServer(express);

// const player = new Player(100, 'Pertinate', 'asdfasdfasdfasdf');
// const enemy = new GearedEntity(100, 'Zach');
// enemy.mainHand = new Weapon('Super Mega Weapon', 'sugoi', '', 5, 30, 1.6);
// player.enemies = [enemy, new GearedEntity(100, 'Wes'), new GearedEntity(100, 'John')];
// const weapon = new Weapon('my weapon', 'my detailed weapon description', '', 1, 10, 1.25);
// player.mainHand = weapon;
// const jsonString = `{"health":100,"maxHealth":100,"name":"Pertinate","attackModifiers":[],"defenseModifiers":[],"mainHand":{"name":"my weapon","description":"my detailed weapon description","image":"","maxDamage":10,"minDamage":1,"attackSpeed":1.25},"enemies":[{"health":100,"maxHealth":100,"name":"Zach","attackModifiers":[],"defenseModifiers":[],"mainHand":{"name":"Super Mega Weapon","description":"sugoi","image":"","maxDamage":30,"minDamage":5,"attackSpeed":1.6}},{"health":100,"maxHealth":100,"name":"Wes","attackModifiers":[],"defenseModifiers":[],"mainHand":{"name":"Fist","description":"Fists","image":"","maxDamage":2,"minDamage":1,"attackSpeed":1}},{"health":100,"maxHealth":100,"name":"John","attackModifiers":[],"defenseModifiers":[],"mainHand":{"name":"Fist","description":"Fists","image":"","maxDamage":2,"minDamage":1,"attackSpeed":1}}],"inventory":{"maxSize":30,"items":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},"sessionId":"asdfasdfasdfasdf"}`;
// const json = JSON.parse(jsonString);
// // console.log(JSON.stringify(player, null, '\t'));
// const fromJson = (data: any) => {
//     const player = new Player(data);
//     player.mainHand = new Weapon(data.mainHand);
//     return player;
// };

// console.log(fromJson(json).toObject());

gqlServer.installSubscriptionHandlers(server);

server.listen(config.port, () => {
    console.log('Server Online on port:', config.port);
});

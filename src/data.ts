import { pubsub } from './graphql';
import { registerBattle } from './logic';
import GearedEntity from './logic/entities/gearedEntity';
import Player from './logic/entities/gearedEntity/player';
import Weapon from './logic/entities/items/weapon';
import { database } from './postgre';

// import Entity from "./logic/entities";
// import Player from './logic/player';

export interface FirebaserUser {
    iss: string;
    aud: string;
    auth_time: number;
    user_id: string;
    sub: string;
    iat: number;
    exp: number;
    email: string;
    email_verified: boolean;
    firebase: ObjectConstructor[];
    uid: string;
}

interface userSession {
    firebaseUser: FirebaserUser;
    gameUser: Player;
    sessionCreated: Date;
    lastUpdated: Date;
    sid: string;
    ttl: number;
}

const session: {
    [id: string]: userSession;
} = {};

const players = {
    playerCount: () => Object.keys(session).length,
    registerPlayer: async (user: userSession) => {
        // console.log(databaseUser);
        // const jsonString = `{"health":100,"maxHealth":100,"name":"Pertinate","attackModifiers":[],"defenseModifiers":[],"mainHand":{"name":"my weapon","description":"my detailed weapon description","image":"","maxDamage":10,"minDamage":1,"attackSpeed":1.25},"enemies":[{"health":100,"maxHealth":100,"name":"Zach","attackModifiers":[],"defenseModifiers":[],"mainHand":{"name":"Super Mega Weapon","description":"sugoi","image":"","maxDamage":30,"minDamage":5,"attackSpeed":1.6}},{"health":100,"maxHealth":100,"name":"Wes","attackModifiers":[],"defenseModifiers":[],"mainHand":{"name":"Fist","description":"Fists","image":"","maxDamage":2,"minDamage":1,"attackSpeed":1}},{"health":100,"maxHealth":100,"name":"John","attackModifiers":[],"defenseModifiers":[],"mainHand":{"name":"Fist","description":"Fists","image":"","maxDamage":2,"minDamage":1,"attackSpeed":1}}],"inventory":{"maxSize":30,"items":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},"sessionId":"asdfasdfasdfasdf"}`;
        // const json = JSON.parse(jsonString);
        // // console.log(JSON.stringify(player, null, '\t'));
        // const fromJson = (data: any) => {
        //     const player = new Player(data);
        //     player.mainHand = new Weapon(data.mainHand);
        //     return player;
        // };

        session[user.sid] = user;
        pubsub.publish('deltaPlayerCount', {
            deltaPlayerCount: players.playerCount(),
        });
        return user.sid;
    },
    unregisterPlayer: (data: { session: string; email: string }) => {
        //write last update to database
        delete session[data.session];
        pubsub.publish('deltaPlayerCount', {
            deltaPlayerCount: players.playerCount(),
        });
    },
};

// setInterval(() => {
//     console.log('session:', session);
// }, 1000);

export { players, session };

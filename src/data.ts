import { pubsub } from "./graphql";

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
    gameUser?: {

    };
    sessionCreated: Date,
    lastUpdated: Date,
    sid: string;
}

let session: {
    [id: string]: userSession;
} = {};

export const playerMapping: ({
    email: string;
    sessionId: string;
})[] = [];

const players = {
    playerCount: () => Object.keys(session).length,
    registerPlayer: (user: userSession) => {
        session[user.sid] = user;
        pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.playerCount() });
        return {
            email: user.firebaseUser.email,
            sessionId: user.sid
        };
    },
    unregisterPlayer: (socketId: string) => {
        delete session[socketId];
        pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.playerCount() });
    }
};

// setInterval(() => {
//     console.log('session:', session);
// }, 1000);

export {
    players,
    session
};

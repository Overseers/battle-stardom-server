import { pubsub } from "./graphql";

let session: {
    [id: string]: {
        firebaseUser: {
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
        };
        gameUser?: {

        };
        sid: string;
    };
} = {
    // 'myuuid': {
    //     email: 'ppertinate@gmail.com'
    // }
};

const players = {
    playerCount: () => Object.keys(session).length,
    registerPlayer: (socketId: string, user: any) => {
        session[socketId] = user;
        pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.playerCount() });
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

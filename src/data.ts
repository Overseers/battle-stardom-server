import { pubsub } from "./graphql";
import { registerBattle } from "./logic";
import GearedEntity from "./logic/entities/gearedEntity";
import Player from './logic/entities/gearedEntity/player';
import Weapon from "./logic/entities/items/weapon";
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
    gameUser?: Player;
    sessionCreated: Date,
    lastUpdated: Date,
    sid: string;
}

let session: {
    [id: string]: userSession;
} = {};

const players = {
    playerCount: () => Object.keys(session).length,
    registerPlayer: (user: userSession) => {
        let player = new Player(100, 'Pertinate', user.sid);
        let enemy = new GearedEntity(100, 'Zach');
        enemy.mainHand = new Weapon('Super Mega Weapon', 'sugoi', '', 5, 30, 1.6);
        player.enemies = [
            enemy,
            new GearedEntity(100, 'Wes'),
            new GearedEntity(100, 'John')
        ];
        // player.enemies = [new Entity(100, 'Test Enemy'), new Entity(100, 'Test Enemy2')];
        // console.log(player.enemies);
        const weapon = new Weapon('my weapon', 'my detailed weapon description', '', 1, 10, 1.25);
        player.mainHand = weapon;

        // const Zach = new GearedEntity(100, 'Zach');
        // // Zach.equipWeapon(ItemBases[ItemLocation.Mainhand].fist);
        // registerBattle({
        //     initiator: '',
        //     initiatorEntity: player,
        //     enemyEntity: Zach
        // });
        session[user.sid] = {
            ...user,
            gameUser: player
        };
        pubsub.publish('deltaPlayerCount', { deltaPlayerCount: players.playerCount() });
        return user.sid;
    },
    unregisterPlayer: (data: ({ session: string, email: string; })) => {
        //write last update to database
        delete session[data.session];
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

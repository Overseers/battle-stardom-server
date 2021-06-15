import { SessionType } from '.';
import { players, session } from '../data';
import Entity from '../logic/entities';
import Player from '../logic/entities/gearedEntity/player';
import { QueryResolvers } from './resolver-types';

export const Query: QueryResolvers<SessionType> = {
    playerCount: () => players.playerCount(),
    getPlayerData: (_, __, sessionData) => {
        console.log(session[sessionData.session]);
        return (session[sessionData.session].gameUser as any as Player).toObject() as any;
    },
    getEnemies: (_, __, sessionData) => {
        return (session[sessionData.session].gameUser as any as Player).getEnemies() as any;
    },
    // getPlayer: (_, __, sessionData) => {
    //     return session[sessionData.session].gameUser?;
    // }
};

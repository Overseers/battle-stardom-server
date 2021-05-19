import { SessionType } from ".";
import { players, session } from "../data";
import Entity from "../logic/entities";
import { QueryResolvers } from './resolver-types';

export const Query: QueryResolvers<SessionType> = {
    playerCount: () => players.playerCount(),
    test: (parent: any, args: any, context: any, info: any) => {
        console.log(parent, args, context, info);
        return 'fuck';
    },
    getEnemies: (_, __, sessionData) => {
        return session[sessionData.session].gameUser?.enemies as Entity[];
    },
    getPlayer: (_, __, sessionData) => {
        return session[sessionData.session].gameUser?.entity as Entity;
    }
};
//

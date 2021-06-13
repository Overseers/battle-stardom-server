import { SessionType } from '.';
import { session } from '../data';
import { playerHasInitiatedBattle, registerBattle } from '../logic';
import { MutationResolvers } from './resolver-types';

export const Mutation: MutationResolvers<SessionType> = {
    initiateBattle: (root, args, context, info) => {
        console.log(root, args, context);
        if (playerHasInitiatedBattle(context.session) === false) {
            console.log('removing enemy');
            let enemy = session[context.session].gameUser?.enemies.splice(args.index, 1);
            if (enemy) {
                registerBattle({
                    initiator: context.session,
                    initiatorEntity: session[context.session].gameUser,
                    enemyEntity: enemy[0]
                });
                return {
                    success: true
                };
            }
            return {
                success: false
            };
        }
        return {
            success: false
        };
    }
};

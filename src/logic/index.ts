import { pubsub } from '../graphql';
import Battle from './battle';
import Entity from './entities';
import GearedEntity from './entities/gearedEntity';
import Player from './player';

const battles: ({
    initiator: string;
    get: Battle;
})[] = [];

const gameLoop = setInterval(() => {
    battles.forEach((battle) => {
        battle.get.getFightStep((totalStep) => {
            console.log('stepping', totalStep);
            if (totalStep.challengerAttack || totalStep.defenderAttack) {
                pubsub.publish(`my_battle`, (totalStep));
            }
            //push information to the initiator
        }, (winner) => {
            //declare winner to initiator
        });
    });
}, 100);

export const registerBattle = ({
    initiator,
    initiatorEntity,
    enemyEntity
}: ({
    initiator: string;
    initiatorEntity: GearedEntity;
    enemyEntity: GearedEntity;
})) => {
    battles.push({
        initiator,
        get: new Battle(initiatorEntity, enemyEntity)
    });
    //potentially send a push notification that the enemyEntity (if player) is being attacked
};



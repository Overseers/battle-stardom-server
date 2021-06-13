import { pubsub } from '../graphql';
import Battle from './battle';
import Entity from './entities';
import GearedEntity from './entities/gearedEntity';
import Player from './entities/gearedEntity/player';

const battles: ({
    initiator: string;
    get: Battle;
})[] = [];

const gameLoop = setInterval(() => {
    battles.forEach((battle) => {
        battle.get.getFightStep((totalStep) => {
            // console.log('stepping', totalStep);
            if (totalStep.challengerAttack || totalStep.defenderAttack) {
                pubsub.publish(`my_battle`, (totalStep));
            }
            //push information to the initiator
        }, (winner, winningStep) => {
            //declare winner to initiator
            battles.splice(battles.findIndex(b => b.initiator === battle.initiator), 1);

            pubsub.publish('my_battle', winningStep);
        });
    });
}, 100);

export const registerBattle = ({
    initiator,
    initiatorEntity,
    enemyEntity
}: ({
    initiator: string;
    initiatorEntity: Player;
    enemyEntity: GearedEntity;
})) => {
    battles.push({
        initiator,
        get: new Battle(initiatorEntity, enemyEntity)
    });
    //potentially send a push notification that the enemyEntity (if player) is being attacked
};

export const playerHasInitiatedBattle = (sessionId: string) => {
    let index = battles.findIndex((battle) => battle.initiator === sessionId);
    console.log(index);
    return index !== -1;
};



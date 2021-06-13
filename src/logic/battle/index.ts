import Entity from "../entities";
import GearedEntity from "../entities/gearedEntity";
import Player from "../entities/gearedEntity/player";
import { ModifierReturn } from "../items/modifier";
import Weapon from "../items/weapon";

interface FightStep {
    entity: 'challenger' | 'defender',
    step: Step;
}

interface Step {
    damageRoll: number;
    damageTaken: number;
    currentHealth: number;
}

interface TotalStep {
    battleOwner: string;
    challengerAttack: Step;
    defenderAttack: Step;
    challengerInfo: GearedEntity;
    defenderInfo: GearedEntity;
    finished: boolean;
}

export default class Battle {
    challenger: Player;
    defender: GearedEntity;
    history: FightStep[] = [];
    nextChallengerAttack: number = 0; //each step is 100ms
    nextDefenderAttack: number = 0;
    victory: -1 | 0 | 1 = -1;
    private fightTickMs = 100;

    constructor(challenger: Player, defender: GearedEntity) {
        this.challenger = challenger;
        this.defender = defender;
        // console.log(challenger, defender);
    }

    private nextFightStep = (first: GearedEntity, second: GearedEntity) => {
        const damageRoll = first.getAttackRoll;
        let damageTaken = second.health;
        second.takeDamage(damageRoll);
        damageTaken -= second.health;
        return {
            damageRoll,
            damageTaken,
            currentHealth: second.health
        };
    };

    getFightStep = (onFightStep: (totalStep: TotalStep) => void, onWin: (winner: boolean, winningStep: TotalStep) => void) => {
        // console.log('hello');
        let challengerAttack = -1;

        if (this.nextChallengerAttack <= 0 && this.victory === -1) {
            challengerAttack = this.history.push({
                entity: 'challenger',
                step: this.nextFightStep(this.challenger, this.defender) as any as Step
            }) - 1;

            if (this.defender.health <= 0) {
                this.victory = 1;
            }

            const totalTicksToAttack = Math.ceil((1000 / (this.challenger.getAttackSpeed * 1000)) * 1000 / this.fightTickMs);
            this.nextChallengerAttack = totalTicksToAttack;
        } else {
            this.nextChallengerAttack--;
        }

        let defenderAttack = -1;

        if (this.nextDefenderAttack <= 0 && this.victory === -1) {
            defenderAttack = this.history.push({
                entity: 'defender',
                step: this.nextFightStep(this.defender, this.challenger) as any as Step
            }) - 1;

            if (this.challenger.health <= 0) {
                this.victory = 0;
            }

            const totalTicksToAttack = Math.ceil((1000 / (this.defender.getAttackSpeed * 1000)) * 1000 / this.fightTickMs);
            this.nextDefenderAttack = totalTicksToAttack;
        } else {
            this.nextDefenderAttack--;
        }

        if (defenderAttack !== -1 || challengerAttack !== -1) {
            onFightStep?.({
                battleOwner: this.challenger.sessionId,
                challengerAttack: this.history[challengerAttack]?.step,
                defenderAttack: this.history[defenderAttack]?.step,
                challengerInfo: this.challenger,
                defenderInfo: this.defender,
                finished: false
            });
        }

        if (this.victory !== -1) {
            onWin?.(this.victory ? true : false, ({
                battleOwner: this.challenger.sessionId,
                challengerAttack: this.history[challengerAttack]?.step,
                defenderAttack: this.history[defenderAttack]?.step,
                challengerInfo: this.challenger,
                defenderInfo: this.defender,
                finished: true
            }));
        }
    };
}

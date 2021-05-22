import Entity from "../entities";
import GearedEntity from "../entities/gearedEntity";
import { ModifierReturn } from "../items/modifier";
import Weapon from "../items/weapon";

interface FightStep {
    entity: 'challenger' | 'defender',
    step: Step;
}

interface Step {
    damageRoll: number;
    damageTaken: number;
}

interface TotalStep {
    challengerAttack: Step;
    defenderAttack: Step;
}

export default class Battle {
    challenger: GearedEntity;
    defender: GearedEntity;
    history: FightStep[] = [];
    nextChallengerAttack: number = 0; //each step is 100ms
    nextDefenderAttack: number = 0;
    victory: -1 | 0 | 1 = -1;
    private fightTickMs = 100;

    constructor(challenger: GearedEntity, defender: GearedEntity) {
        this.challenger = challenger;
        this.defender = defender;
    }

    private nextFightStep = (first: GearedEntity, second: GearedEntity) => {
        const damageRoll = first.getAttackRoll;
        let damageTaken = second.health;
        second.takeDamage(damageRoll);
        damageTaken -= second.health;
        return {
            damageRoll,
            damageTaken
        };
    };

    fight = (onNextFightStep: (totalStep: TotalStep) => void, onWin: (winner: boolean, player: GearedEntity) => void) => {
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
            onNextFightStep?.({
                challengerAttack: this.history[challengerAttack]?.step,
                defenderAttack: this.history[defenderAttack]?.step
            });
        }

        if (this.victory !== -1) {
            onWin?.(this.victory ? true : false, this.challenger);
        }

        if (this.victory === -1) {
            setTimeout(() => this.fight(onNextFightStep, onWin), this.fightTickMs);
        }
    };
}

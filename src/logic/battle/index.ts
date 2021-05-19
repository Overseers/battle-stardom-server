import Entity from "../entities";
import { ModifierReturn } from "../items/modifier";
import Weapon from "../items/weapon";

interface FightStep {
    entity: 'challenger' | 'defender',
    step: Step;
}

interface Step {
    damageRoll: {
        damage: number;
        steps: ModifierReturn<Object>[];
    };
    damageTaken: number;
}

interface TotalStep {
    challengerAttack: Step;
    defenderAttack: Step;
}

export default class Battle {
    challenger: Entity;
    defender: Entity;
    history: FightStep[] = [];
    nextChallengerAttack: number = 0; //each step is 100ms
    nextDefenderAttack: number = 0;
    victory: -1 | 0 | 1 = -1;
    private fightTickMs = 100;

    constructor(challenger: Entity, defender: Entity) {
        this.challenger = challenger;
        this.defender = defender;
    }

    private nextFightStep = (first: Entity, second: Entity) => {
        const damageRoll = first.getAttackRoll;

        const damageTaken = second.takeDamage(damageRoll.damage);
        return {
            damageRoll,
            damageTaken
        };
    };

    fight = (onNextFightStep: (totalStep: TotalStep) => void, onWin: () => void) => {
        // console.log('hello');
        let challengerAttack = -1;

        if (this.nextChallengerAttack <= 0 && this.victory === -1) {
            challengerAttack = this.history.push({
                entity: 'challenger',
                step: this.nextFightStep(this.challenger, this.defender) as any as Step
            }) - 1;

            if (this.defender.health <= 0) {
                this.victory = 1;
                onWin?.();
            }

            const totalTicksToAttack = Math.ceil((1000 / (this.challenger.attackSpeed * 1000)) * 1000 / this.fightTickMs);
            this.nextChallengerAttack = totalTicksToAttack;
        } else {
            this.nextChallengerAttack--;
        }

        let defenderAttack = -1;

        if (this.nextDefenderAttack <= 0 && this.victory === -1) {
            const test = this.nextFightStep(this.defender, this.challenger);
            defenderAttack = this.history.push({
                entity: 'defender',
                step: {
                    damageRoll: {
                        damage: test.damageRoll.damage,
                        steps: test.damageRoll.steps.map(entry => entry.step)
                    },
                    damageTaken: test.damageTaken
                }
            }) - 1;

            if (this.challenger.health <= 0) {
                this.victory = 0;
                onWin?.();
            }

            const totalTicksToAttack = Math.ceil((1000 / (this.defender.attackSpeed * 1000)) * 1000 / 100);
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

        if (this.victory === -1) {
            setTimeout(() => this.fight(onNextFightStep, onWin), this.fightTickMs);
        }
    };
}

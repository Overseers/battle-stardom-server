import EquippableItem from "./info/equippableItem";

export default class Weapon extends EquippableItem<Weapon> {
    maxDamage: number;
    minDamage: number;

    attackSpeed: number;

    constructor(name: string, description: string, image: string, minDamage: number, maxDamage: number, attackSpeed: number) {
        super(name, description, image);

        this.maxDamage = maxDamage;
        this.minDamage = minDamage;
        this.attackSpeed = attackSpeed;
    }

    getDamageWithModifiers = () => {
        const preCalculationModifiers = this.modifiers.filter(entry => entry.isNeededPreCalculation);
        return {
            min: preCalculationModifiers.reduce((acc, next) => {
                const applied = next.apply(this);
                if (next.apply !== undefined) {
                    acc = applied[0];
                }
                return acc;
            }, this.minDamage),
            max: preCalculationModifiers.reduce((acc, next) => {
                const applied = next.apply(this);
                if (next.apply !== undefined) {
                    acc = applied[1];
                }
                return acc;
            }, this.maxDamage)
        };
    };

    getBaseDamageRoll = () => {
        const preCalcDmg = this.getDamageWithModifiers();

        return Number(((Math.random() * (preCalcDmg.max - (preCalcDmg.min))) + preCalcDmg.min).toFixed(2));
    };

    getFinalDamage = () => {
        return this.modifiers.filter(entry => !entry.isNeededPreCalculation).reduce((acc, next) => {
            acc = next.apply(acc)[0];
            return acc;
        }, this.getBaseDamageRoll());
    };

    toJSON = () => {
        return {
            ...super.toJSON(),
            maxDamage: this.maxDamage,
            minDamage: this.minDamage,
            attackSpeed: this.attackSpeed
        };
    };

    // get baseDamageRoll() {
    //     return (Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
    // }
}

import EquippableItem from "./info/equippableItem";

export default class Weapon extends EquippableItem<Weapon> {
    maxDamage: number;
    minDamage: number;

    //EQUIPPABLE ITEMS WILL REQUIRE 

    constructor(name: string, description: string, image: string, maxDamage: number, minDamage: number) {
        super(name, description, image);

        this.maxDamage = maxDamage;
        this.minDamage = minDamage;
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
            }, 0)
        };
    };

    getBaseDamageRoll = () => {
        const preCalcDmg = this.getDamageWithModifiers();

        return (Math.random() * (preCalcDmg.max - (preCalcDmg.min + 1))) + preCalcDmg.min;
    };

    getFinalDamage = () => {
        return this.modifiers.filter(entry => !entry.isNeededPreCalculation).reduce((acc, next) => {
            acc = next.apply(acc)[0];
            return acc;
        }, this.getBaseDamageRoll());
    };

    // get baseDamageRoll() {
    //     return (Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
    // }
}

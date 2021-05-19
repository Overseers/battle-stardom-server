import EquippableItem from "./info/equippableItem";
import WeaponModifier from './modifiers/weaponModifier';

export default class Weapon extends EquippableItem<Weapon> {
    maxDamage: number;
    minDamage: number;

    constructor(name: string, description: string, image: string) {
        super(name, description, image);
    }

    getDamageWithModifiers = () => {
        return {
            min: this.modifiers.reduce((acc, next) => {
                const applied = next.apply(this);
                if (next.apply !== undefined) {
                    acc = applied[0];
                }
                return acc;
            }, this.minDamage),
            max: this.modifiers.reduce((acc, next) => {
                const applied = next.apply(this);
                if (next.apply !== undefined) {
                    acc = applied[1];
                }
                return acc;
            }, 0)
        };
    };

    // get baseDamageRoll() {
    //     return (Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
    // }
}

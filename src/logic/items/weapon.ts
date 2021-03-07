import WeaponModifier, { ModifierReturn } from "./modifier";
import Item from './item';

export default class Weapon extends Item {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;
    modifiers: WeaponModifier[];

    constructor(weaponInfo: {
        name: string;
        minDamage: number;
        maxDamage: number;
        description?: string;
        attackSpeed: number;
        image: string;
    }, modifiers: WeaponModifier[]) {
        super(weaponInfo.name, weaponInfo.description || '', weaponInfo.image);
        this.minDamage = weaponInfo.minDamage;
        this.maxDamage = weaponInfo.maxDamage;
        this.attackSpeed = weaponInfo.attackSpeed;
        this.modifiers = modifiers;
    }

    get baseDamageRoll() {
        return Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
    }

    modifiedDamageRoll() {
        let steps: ModifierReturn<Object>[] = [];
        return {
            damage: this.modifiers.reduce((acc, next) => {
                const modifier = next.apply(acc);
                acc = modifier.value;
                steps.push(modifier);
                return acc;
            }, this.baseDamageRoll),
            steps
        };
    }
}

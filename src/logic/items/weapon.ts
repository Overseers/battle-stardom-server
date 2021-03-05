import WeaponModifier from "./modifier";

export default class Weapon {
    name: string;
    minDamage: number;
    maxDamage: number;
    description: string;
    attackSpeed: number;
    modifiers: WeaponModifier[];

    constructor(weaponInfo: {
        name: string;
        minDamage: number;
        maxDamage: number;
        description?: string;
        attackSpeed: number;
    }, modifiers: WeaponModifier[]) {
        this.name = weaponInfo.name;
        this.minDamage = weaponInfo.minDamage;
        this.maxDamage = weaponInfo.maxDamage;
        this.description = weaponInfo.description || '';
        this.attackSpeed = weaponInfo.attackSpeed;
        this.modifiers = modifiers;
    }

    get baseDamageRoll() {
        return Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
    }

    modifiedDamageRoll() {
        return this.modifiers.reduce((acc, next) => {
            acc = next.apply(acc).value;
            return acc;
        }, this.baseDamageRoll);
    }
}

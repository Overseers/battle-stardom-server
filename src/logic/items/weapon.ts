import WeaponModifier, { ModifierReturn } from "./modifier";
import Item from './item';
import Modifier from "./modifier";
import { property } from "class-converter";

export default class Weapon extends Item {
    @property()
    minDamage: number;
    @property()
    maxDamage: number;
    @property()
    attackSpeed: number;
    @property()
    modifiers: WeaponModifier[];

    constructor(weaponInfo: {
        name: string;
        minDamage: number;
        maxDamage: number;
        description?: string;
        attackSpeed: number;
        image: string;
    }, modifiers: WeaponModifier[] = []) {
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
        let steps: ({
            step: ModifierReturn<Object>,
            origin: Modifier;
        })[] = [];
        return {
            damage: this.modifiers.reduce((acc, next) => {
                const modifier = next.apply(acc);
                acc = modifier.value;
                steps.push({
                    step: modifier,
                    origin: next
                });
                return acc;
            }, this.baseDamageRoll),
            steps
        };
    }
}

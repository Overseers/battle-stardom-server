import Weapon from "../items/weapon";

export interface EntityInfo {
    name: string;
}

export default class Entity implements EntityInfo {
    health: number = 0;
    maxHealth: number = 0;
    defencePower: number = 2;
    attackPower: number = 0;
    weapon: Weapon = new Weapon({
        name: 'Fist',
        description: 'Hands of the wielder',
        minDamage: 1,
        maxDamage: 3,
        attackSpeed: 1
    }, []);
    name: string;

    constructor(health: number, name: string) {
        this.health = health;
        this.maxHealth = health;
        this.name = name;
    }

    get getAttackRoll(): number {
        const damage = this.weapon.modifiedDamageRoll();
        // console.log(`${this.name}: rolled ${damage}`);
        return damage;
    }

    takeDamage = (damage: number) => {
        const calculatedDamage = Number((damage * ((1 - (0.06 * this.defencePower)) / (1 + (0.06 * this.defencePower)))).toFixed(2));
        // console.log('NEW CALC:', calculatedDamage);
        this.health = Math.max(Number((this.health - calculatedDamage).toFixed(2)), 0);
        return calculatedDamage;
        // console.log(`${this.name}: took ${damage}. ${this.name} has ${this.health}/${this.maxHealth} left.`);
    };

    equipWeapon = (weapon: Weapon) => {
        this.weapon = weapon;
    };

    toString() {
        return JSON.stringify(this);
    }
}



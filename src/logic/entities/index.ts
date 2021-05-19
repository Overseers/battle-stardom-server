import { ItemBases, ItemLocation } from "../items/itemBase";
import Weapon from "../items/weapon";

export interface EntityInfo {
    name: string;
}

export default class Entity implements EntityInfo {
    health: number = 0;
    maxHealth: number = 0;
    defencePower: number = 2;
    attackPower: number = 0;
    mainHand: Weapon = ItemBases[ItemLocation.Mainhand].fist;
    name: string;

    constructor(health: number, name: string) {
        this.health = health;
        this.maxHealth = health;
        this.name = name;
        this.equipWeapon(ItemBases[ItemLocation.Mainhand].fist); //always have this equipped as default
    }

    get getAttackRoll() {
        const damageRoll = this.mainHand.modifiedDamageRoll();
        // console.log(`${this.name}: rolled ${damage}`);
        return damageRoll;
    }

    takeDamage = (damage: number) => {
        const calculatedDamage = Number((damage * ((1 - (0.06 * this.defencePower)) / (1 + (0.06 * this.defencePower)))).toFixed(2));
        // console.log('NEW CALC:', calculatedDamage);
        this.health = Math.max(Number((this.health - calculatedDamage).toFixed(2)), 0);
        return calculatedDamage;
        // console.log(`${this.name}: took ${damage}. ${this.name} has ${this.health}/${this.maxHealth} left.`);
    };

    get attackSpeed() {
        return this.mainHand.attackSpeed; //add in modifiers for attack speed
    }

    equipWeapon = (weapon: Weapon) => {
        this.mainHand = weapon;
    };

    toString() {
        return JSON.stringify(this);
    }
}



import Entity from "..";
import premade from "../items/premade";
import Weapon from "../items/weapon";

export default class GearedEntity extends Entity {
    mainHand: Weapon;
    offHand: undefined;//Weapon | Shield;
    head: undefined;
    chest: undefined;
    gloves: undefined;
    boots: undefined;

    attackModifiers: undefined[] = [];
    defenseModifiers: undefined[] = [];

    constructor(health: number, name: string) {
        super(health, name);
        this.mainHand = premade.fist;
    }

    get getAttackSpeed(): number {
        // check if dual wield, more attack speed

        return this.mainHand.attackSpeed; //check modifiers for attack speed scaling
    }

    get getAttackRoll(): number {
        return this.mainHand.getFinalDamage();
    }

    takeDamage: (damage: number) => void = (damage) => {
        this.health = Math.max(this.health - damage, 0);
    };
}

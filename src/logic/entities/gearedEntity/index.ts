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

    constructor(health: number, name: string) {
        super(health, name);
        this.mainHand = premade.fist;
    }

    get getAttackRoll(): number {
        throw new Error("Method not implemented.");
    }
    takeDamage: (damage: number) => number;
}

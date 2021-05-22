import GearedEntity from "..";
import Inventory from "./inventory";

export default class Player extends GearedEntity {
    inventory: Inventory;

    constructor(health: number, name: string) {
        super(health, name);
        this.inventory = new Inventory();
    }
}

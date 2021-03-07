import Inventory from "./inventory";

export default class Player {
    inventory: Inventory;
    constructor() {
        this.inventory = new Inventory();//need to check if inventory saved and load it in
    }
}

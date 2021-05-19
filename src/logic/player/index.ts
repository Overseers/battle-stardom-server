import Inventory from "./inventory";
import Entity from '../entities';
import EntityModifier from "../entities/modifier";

export default class Player {
    inventory: Inventory;
    startingHealth: number = 20;
    entity: Entity;
    modifiers: EntityModifier[] = [];
    currentLevel: number = 1;
    currentExperience: number = 0;
    enemies: Entity[] = [];

    get nextLevelExperience(): number {
        return 5000;
    }

    constructor(username: string) {
        this.inventory = new Inventory();//need to check if inventory saved and load it in
        this.entity = new Entity(this.startingHealth, username);
    }

    private applyModifier(modifier: EntityModifier) {

    }

    registerNewSetOfEnemies = (enemies: Entity[]) => {
        enemies = [...enemies];
    };
}

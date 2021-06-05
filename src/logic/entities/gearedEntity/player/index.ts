import GearedEntity from "..";
import Inventory from "./inventory";

export default class Player extends GearedEntity {
    inventory: Inventory;
    enemies: GearedEntity[] = [];
    sessionId: string;

    constructor(health: number, name: string, sessionId: string) {
        super(health, name);
        this.inventory = new Inventory();
        this.sessionId = sessionId;
    }

    getEnemies = () => {
        return this.enemies.map(entry => entry.toObject());
    };

    toObject = () => {
        return {
            inventory: this.inventory.toObject(),
            mainHand: this.mainHand,
            health: this.health,
            maxHealth: this.maxHealth,
            name: this.name,
            attackSpeed: this.getAttackSpeed
        };
    };
}

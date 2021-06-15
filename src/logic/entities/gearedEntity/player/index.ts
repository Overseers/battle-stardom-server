import GearedEntity from '..';
import Inventory from './inventory';

export default class Player extends GearedEntity {
    inventory: Inventory;
    enemies: GearedEntity[] = [];
    sessionId: string;

    constructor(init: Partial<Player>) {
        super(init);
        for (const key in init) {
            this[key] = init[key];
        }
        this.enemies = init.enemies.map((entry) => new GearedEntity(entry));
        this.inventory = new Inventory();
        this.postConstructor();
    }

    getEnemies = () => {
        // console.log(this.enemies);
        return this.enemies.map((entry) => entry.toObject());
    };

    toObject = () => {
        return {
            inventory: this.inventory.toObject(),
            mainHand: this.mainHand,
            health: this.health,
            maxHealth: this.maxHealth,
            name: this.name,
            attackSpeed: this.getAttackSpeed,
        };
    };
}

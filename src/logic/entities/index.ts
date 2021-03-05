export default class Entity {
    health: number = 0;
    defencePower: number = 0;
    attackPower: number = 0;

    constructor(health: number) {
        this.health = health;
    }

    get getAttackRoll(): number {
        return 0;
    }

    takeDamage(damage: number) {

    }

    toString() {
        return JSON.stringify(this);
    }
}



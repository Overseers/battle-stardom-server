export default abstract class Entity {
    health = 0;
    maxHealth = 0;
    name: string;

    constructor(init: Partial<Entity>) {
        for (const key in init) {
            this[key] = init[key];
        }
    }

    abstract get getAttackRoll(): number;

    abstract takeDamage: (damage: number) => void;
    //     = (damage: number) => {
    //     const calculatedDamage = Number((damage * ((1 - (0.06 * this.defencePower)) / (1 + (0.06 * this.defencePower)))).toFixed(2));
    //     // console.log('NEW CALC:', calculatedDamage);
    //     this.health = Math.max(Number((this.health - calculatedDamage).toFixed(2)), 0);
    //     return calculatedDamage;
    //     // console.log(`${this.name}: took ${damage}. ${this.name} has ${this.health}/${this.maxHealth} left.`);
    // };

    toString() {
        return JSON.stringify(this);
    }
}

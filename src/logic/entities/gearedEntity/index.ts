import Entity from '..';
import premade from '../items/premade';
import Weapon from '../items/weapon';

export default class GearedEntity extends Entity {
    mainHand: Weapon;
    offHand: undefined; //Weapon | Shield;
    head: undefined;
    chest: undefined;
    gloves: undefined;
    boots: undefined;

    attackModifiers: undefined[] = [];
    defenseModifiers: undefined[] = [];

    constructor(init: Partial<GearedEntity>) {
        super(init);
        for (const key in init) {
            this[key] = init[key];
        }
        this.postConstructor();
    }

    postConstructor = () => {
        this.mainHand = new Weapon(this.mainHand || premade.fist);
    };

    get getAttackSpeed(): number {
        // check if dual wield, more attack speed
        console.log('attack speed:', this.mainHand);

        return this.mainHand.attackSpeed; //check modifiers for attack speed scaling
    }

    get getAttackRoll(): number {
        console.log('attack roll:', this.mainHand);
        return this.mainHand.getFinalDamage();
    }

    takeDamage: (damage: number) => void = (damage) => {
        this.health = Math.max(this.health - damage, 0);
    };

    toObject = () => {
        return {
            mainHand: this.mainHand,
            health: this.health,
            maxHealth: this.maxHealth,
            name: this.name,
            attackSpeed: this.getAttackSpeed,
        };
    };
}

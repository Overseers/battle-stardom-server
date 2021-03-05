import Weapon from "./weapon";

export interface ModifierReturn<T extends Object = Object> {
    specialInfo?: T;
    value: number;
}

export default class WeaponModifier {
    name: string = "";
    description: string = "";
    min: number;
    max: number;
    private Apply: (damageRoll: number, min: number, max: number) => ModifierReturn;

    constructor(min: number, max: number, apply?: (damageRoll: number, min: number, max: number) => ModifierReturn) {
        this.min = min;
        this.max = max;
        this.Apply = apply ? apply : this.defaultApply;
    }

    public apply = (damageRoll: number): ModifierReturn => {
        return this.Apply(damageRoll, this.min, this.max);
    };

    private defaultApply = (damageRoll: number, min: number, max: number): ModifierReturn => {
        return {
            value: 0
        };
    };
}

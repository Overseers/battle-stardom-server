import Weapon from "./weapon";

export interface ModifierReturn<T extends Object = Object> {
    specialInfo?: T;
    value: number;
}

export default class Modifier {
    name: string = "";
    description: string = "";
    min: number;
    max: number;
    tier: number = 0;
    private Apply: (input: number, min: number, max: number) => ModifierReturn;

    constructor(min: number, max: number, apply?: (input: number, min: number, max: number) => ModifierReturn) {
        this.min = min;
        this.max = max;
        this.Apply = apply ? apply : this.defaultApply;
    }

    public apply = (input: number): ModifierReturn => {
        return this.Apply(input, this.min, this.max);
    };

    private defaultApply = (input: number, min: number, max: number): ModifierReturn => {
        return {
            value: 0
        };
    };
}

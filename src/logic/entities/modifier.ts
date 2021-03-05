import Entity from ".";

export interface ModifierReturn<T extends Object = Object> {
    specialInfo?: T;
    value: number;
}

export default class EntityModifier {
    name: string = "";
    description: string = "";
    min: number;
    max: number;
    private Apply: (min: number, max: number, entity: Entity) => ModifierReturn;

    constructor(min: number, max: number, apply?: (min: number, max: number, entity: Entity) => ModifierReturn) {
        this.min = min;
        this.max = max;
        this.Apply = apply ? apply : this.defaultApply;
    }

    public apply = (entity: Entity): ModifierReturn => {
        return this.Apply(this.min, this.max, entity);
    };

    private defaultApply = (min: number, max: number, entity: Entity): ModifierReturn => {
        return {
            value: 0
        };
    };
}

import Location from "../info/itemLocations";
import Affix, { getAffixesForLocation } from "../affixes";

export default abstract class ItemModifier<T> {
    public get name(): string {
        return this.getModifierInfo().name;
    }

    public get description(): string {
        return this.getModifierInfo().description;
    }

    rollMin: number;
    rollMax: number;

    affixType: "prefix" | "suffix";
    location: Location;
    type: number;
    tier: number;

    isNeededPreCalculation: boolean;

    isPrefix: boolean;

    abstract apply: (data: T | number) => number[];

    innerApply = (
        data: T | number,
        callback: (weapon: T | number, affix: Affix) => any = () => 0
    ) =>
        callback(
            data,
            getAffixesForLocation(this.location)[this.affixType][this.type][this.tier]
        );

    abstract applyCallback: (data: T | number, affix: Affix) => any;

    getModifierInfo = () => {
        return getAffixesForLocation(this.location)[this.affixType][this.type][
            this.tier
        ];
    };

    abstract toJSON(): Object;
}

import Location from '../info/itemLocations';
import Affix, { getAffixesForLocation } from '../affixes';

export default abstract class Modifier<T> {
    public get name(): string {
        return this.getModifierInfo().name;
    }

    public get description(): string {
        return this.getModifierInfo().description;
    }

    affixType: 'prefix' | 'suffix';
    location: Location;
    type: number;
    tier: number;

    isNeededPreCalculation: boolean;

    isPrefix: boolean;

    abstract apply: (data: T) => number[];

    innerApply = (data: T, callback: (weapon: T, affix: Affix) => any = () => 0) => callback(data, getAffixesForLocation(this.location)[this.affixType][this.type][this.tier]);

    abstract applyCallback: (data: T, affix: Affix) => any;

    getModifierInfo = () => {
        return getAffixesForLocation(this.location)[this.affixType][this.type][this.tier];
    };

    abstract toJSON(): Object;
}

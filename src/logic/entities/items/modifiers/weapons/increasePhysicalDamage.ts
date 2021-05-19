import Location from "../../info/itemLocations";
import Weapon from "../../weapon";
import Affix, { getAffixesForLocation } from "../../affixes";
import Modifier from "../modifier";

export default class IncreasePhysicalDamage extends Modifier<Weapon> {
    constructor(location: Location.weapon | Location.offHand, isPrefix: boolean, type: number, tier: number) {
        super();
        this.affixType = isPrefix ? 'prefix' : 'suffix';
        this.location = location;
        this.type = type;
        this.tier = tier;
    }

    apply = (weapon: Weapon) => {
        if (!weapon)
            return 0;

        return this.innerApply(weapon, this.applyCallback);
    };

    applyCallback: (data: Weapon, affix: Affix) => number[] = (data, affix) => {
        if (affix.from.max === affix.from.min && affix.to.max === affix.to.min) {
            return [data.minDamage * (1 + (affix.from.min / 100))];
        }

        return [data.minDamage * (1 + (affix.from.min / 100)), data.maxDamage * (1 + (affix.from.max / 100))];
    };

    toJSON(): Object {
        return this.getModifierInfo();
    }
}

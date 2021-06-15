import Location from "../../info/itemLocations";
import Weapon from "../../weapon";
import Affix, { getAffixesForLocation } from "../../affixes";
import ItemModifier from "../itemModifier";
import weapon from "../../affixes/weapon";

export default class IncreasePhysicalDamage extends ItemModifier<Weapon> {
    constructor(type: number, tier: number, isNeededPrecalculation = true) {
        super();
        this.affixType = "prefix";
        this.location = Location.weapon;
        this.type = type;
        this.tier = tier;
        this.isNeededPreCalculation = isNeededPrecalculation;
    }

    apply = (weapon: Weapon | number) => {
        if (!weapon) return 0;

        return this.innerApply(weapon, this.applyCallback);
    };

    applyCallback: (data: Weapon | number, affix: Affix) => number[] = (
        data,
        affix
    ) => {
        if (typeof data === "number") return [data];
        if (affix.from.max === affix.from.min && affix.to.max === affix.to.min) {
            return [data.minDamage * (1 + affix.from.min / 100)];
        }

        return [
            data.minDamage * (1 + affix.from.min / 100),
            data.maxDamage * (1 + affix.from.max / 100),
        ];
    };

    toJSON(): Object {
        return this.getModifierInfo();
    }
}

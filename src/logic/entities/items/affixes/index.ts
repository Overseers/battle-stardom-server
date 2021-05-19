import Location from "../info/itemLocations";
import weapon from "./weapon";

export default interface Affix {
    name: string;
    tier: number;
    description: string;
    from: {
        min: number;
        max: number;
    };
    to: {
        min: number;
        max: number;
    };
}

export interface LocationAffixes {
    prefix: [
        Affix[]
    ];
    suffix: [
        Affix[]
    ];
};

export const getAffixesForLocation = (location: Location) => {
    switch (location) {
        case Location.weapon:
            return weapon;

        default:
            break;
    }
};

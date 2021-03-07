import Weapon from "./weapon";

export enum ItemLocation {
    Head,
    Body,
    Mainhand,
    Offhand
}

export const ItemBases = {
    [ItemLocation.Head]: {

    },
    [ItemLocation.Body]: {

    },
    [ItemLocation.Mainhand]: {
        testSword: new Weapon({
            name: 'Test Sword',
            description: 'A sword for testing',
            image: '',
            minDamage: 1,
            maxDamage: 10,
            attackSpeed: 1.5
        }, []),
        fist: new Weapon({
            name: 'Fist',
            description: 'Hands of the wielder',
            minDamage: 1,
            maxDamage: 3,
            attackSpeed: 1,
            image: ''
        }, [])
    },
    [ItemLocation.Offhand]: {

    }
};

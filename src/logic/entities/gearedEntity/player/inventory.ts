import Item from "../../items/info/item";

export default class Inventory {
    items: Item[];
    maxSize: number;
    constructor(maxSize: number = 30) {
        this.maxSize = maxSize;
        this.items = Array(maxSize).fill(undefined);
    }

    addItem = (item: Item) => {
        const index = this.items.findIndex(entry => entry === undefined);

        if (index !== -1) {
            this.items[index] = item;
            return true;
        } else {
            //somehow notify player inventory is full
            return false;
        }
    };

    removeItem = (item: Item | number) => {
        if (typeof item === 'number') {
            const itemReturn = this.items[item];
            this.items[item] = undefined;
            return itemReturn;
        }

        const index = this.items.findIndex(entry => JSON.stringify(entry) === JSON.stringify(item));

        if (index !== -1) {
            this.items[index] = undefined;
            return item;
        } else {
            //notify player failed to find item to delete
            return undefined;
        }
    };

    increaseInventorySize = (amountToIncreaseBy: number) => {
        const previousInventory = [...this.items];
        this.items = [...previousInventory, ...Array(amountToIncreaseBy).fill(undefined)];

        this.maxSize += amountToIncreaseBy;
    };
}


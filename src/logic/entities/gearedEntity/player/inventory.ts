import Item from "../../items/info/item";

export default class Inventory {
    items: Item[];
    maxSize: number;
    constructor(maxSize: number = 30) {
        this.maxSize = maxSize;
        this.items = Array(maxSize).fill(null);
    }

    addItem = (item: Item) => {
        const index = this.items.findIndex(entry => entry === null);

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
            this.items[item] = null;
            return itemReturn;
        }

        const index = this.items.findIndex(entry => JSON.stringify(entry) === JSON.stringify(item));

        if (index !== -1) {
            this.items[index] = null;
            return item;
        } else {
            //notify player failed to find item to delete
            return null;
        }
    };

    increaseInventorySize = (amountToIncreaseBy: number) => {
        const previousInventory = [...this.items];
        this.items = [...previousInventory, ...Array(amountToIncreaseBy).fill(null)];

        this.maxSize += amountToIncreaseBy;
    };

    toObject = () => {
        return {
            items: this.items.map(entry => entry?.toJSON()),
            maxSize: this.maxSize
        };
    };
}


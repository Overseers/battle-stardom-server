import Item from "../items/item";
import { property, typed } from 'class-converter';

export default class Inventory {
    @property()
    max: number = 30;
    @property()
    private items: (Item | undefined)[] = Array(this.max).fill(undefined);
    constructor(savedInventory: Item[] = []) {
        if (savedInventory) {
            this.items.push(...savedInventory);
        }
    }

    removeSlot = (slotNumber: number) => {
        if (this.items.length >= slotNumber && this.items[slotNumber]) {
            const item = this.items[slotNumber];
            this.items[slotNumber] = undefined;
            return item;
        } else {
            return undefined;
        }
    };

    removeItem = (item: Item) => {
        const index = this.items.findIndex(entry => JSON.stringify(entry) === JSON.stringify(item));
        if (index !== -1) {
            const returnItem = this.items[index];
            this.items[index] = undefined;
            return returnItem;
        } else {
            return undefined;
        }
    };

    addItem = (item: Item) => {
        const index = this.items.findIndex(entry => entry === undefined);

        if (index !== -1) {
            this.items[index] = item;
        }

        return index;
    };

    get getItems() {
        return [...this.items];
    }
}

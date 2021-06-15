export default class Item {
    name: string;
    description: string;
    image: string;
    constructor(init: Partial<Item>) {
        Object.assign(this, init);
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            image: this.image,
        };
    }
}

export default class Item {
    name: string;
    description: string;
    image: string;
    constructor(name: string, description: string, image: string) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            image: this.image
        };
    };
}

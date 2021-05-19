import Item from "./item";
import Modifier from "../modifiers/modifier";

export default class EquippableItem<Y> extends Item {
    modifiers: Modifier<Y>[] = [];

    constructor(name: string, description: string, image: string) {
        super(name, description, image);
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            image: this.image,
            modifiers: this.modifiers
        };
    };
}

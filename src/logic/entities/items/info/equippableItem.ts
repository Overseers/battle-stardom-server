import Item from "./item";
import ItemModifier from "../modifiers/itemModifier";

export default class EquippableItem<Y> extends Item {
    modifiers: ItemModifier<Y>[] = [];

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

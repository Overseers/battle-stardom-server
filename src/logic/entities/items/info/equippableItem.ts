import Item from './item';
import ItemModifier from '../modifiers/itemModifier';

export default class EquippableItem<Y> extends Item {
    modifiers: ItemModifier<Y>[] = [];

    constructor(init: Partial<EquippableItem<Y>>) {
        super(init);
        Object.assign(this, init);
    }

    toJSON: () => any = () => {
        return {
            name: this.name,
            description: this.description,
            image: this.image,
            modifiers: this.modifiers,
        };
    };
}

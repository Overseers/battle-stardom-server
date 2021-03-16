import { property } from 'class-converter';
import Modifier from './modifier';

export default class Item {
    @property()
    name: string;
    @property()
    description: string;
    @property()
    image: string;
    constructor(name: string, description: string, image: string) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    get modifierList(): string[] {
        return [];
    }

    toString() {
        return JSON.stringify(this);
    }
}

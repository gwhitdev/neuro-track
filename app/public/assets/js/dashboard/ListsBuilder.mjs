import EFactory from "./ElementFactory.mjs";

export default class ListsBuilder
{
    static #lists = {
        ulList: null,
        olList: null
    };

    static build() {
        this.#lists.olList = EFactory.create({ type: 'ol' });
        this.#lists.ulList = EFactory.create({ type: 'ul' });
        return this.#lists;
    }
}
export default class EFactory
{
    static allowedTypes = ['li','div','ul','ol','text'];

    static create(element) {
        try {
            return this.#createNewElement(element);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static #validateElementInput(element)  {
        if (typeof element !== 'object' || element === null ) {
            throw new Error('EFactory.#validateElementInput: Could not validate required element: creation attempt not successful. Try again with a valid object');
        }
        return this.allowedTypes.includes(element.type);
    }
    static #createTextNode(msg) {
        if (typeof msg !== 'string' || msg.trim() === '') {
            throw new Error('EFactory.#createTextNote: Argument must be a non-empty string.')
        }
        return document.createTextNode(msg);
    }

    static #createNewElement(element) {
        if (! this.#validateElementInput(element)) {
            throw new Error(`EFactory.#createNewElement: Invalid element type "${element.type}". Allowed types: ${this.allowedTypes.join(', ')}.`);
        }
        if (element.type === 'text') {
            return this.#createTextNode(element.msg);
        }
        return document.createElement(element.type);
    }
}


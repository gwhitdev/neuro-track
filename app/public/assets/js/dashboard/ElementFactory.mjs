export default class EFactory
{
    static elementList = { returnable: null };

    static create(element) {
        try {
            this.elementList.returnable = this.#createNewElement(element);
        } catch (err) {
            console.error(err);
        }
        return this.elementList.returnable;
    }

    static #validateElementInput(element)  {
        if (!element instanceof Object ) throw new Error('Error: DJS44: Element creation attempt not successful. Try again with a valid string');
        else {
            const acceptableElements = ['li','div','ul','ol','text'];
            return acceptableElements.includes(element.type);
        }
    }
    static #createTextNode(msg) {
        return document.createTextNode(msg);
    }

    static #createNewElement(element) {
        if (! this.#validateElementInput(element)) {
            console.error('Error DSJ54: Inputted element cannot be created.');
            return;
        }
        if (element.type === 'text') return this.#createTextNode(element.msg);
        return document.createElement(element.type);
    }
}


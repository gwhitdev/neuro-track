import EFactory from "./ElementFactory.mjs";
import ListsBuilder from "./ListsBuilder.mjs";

export default class Dashboard
{
    fetched = {};
    sub = null;
    divElements = [];
    textNodes = [];
    unorderedList = null;
    orderedList = null;
    randomKey = null;
    domDataDiv = null;
    loadingTextNode = null;
    loadingTextDiv = null;

    constructor() {
        this.#getSubFromDom()
        this.#createRandomKey();
        this.#getDomDataDiv();
        this.#loadData();
        this.#loadDomElements();
        this.orderedList.dataset.key = this.randomKey;
    }

    #createRandomKey() {
        this.randomKey = Math.floor(Math.random()*1000).toString();
    }

    #applyStyling(element) {
        element.classList.add('lists');
    }

    #attachToDataDiv(node) {
        this.divElements[0].appendChild(node);
    }

    #noDataReceived() {
        this.textNodes.noDataTextNode = EFactory.create({ type: 'text', msg: 'No data received' });
        this.#attachToDataDiv(this.textNodes.noDataTextNode)
    }

    #loadDomElements() {
        this.divElements.push(EFactory.create({ type: 'div' }));
        const lists = ListsBuilder.build();
        this.unorderedList = lists.ulList;
        this.orderedList = lists.olList;
        this.domDataDiv.append(this.orderedList);
    }

    #getDomDataDiv() {
        this.domDataDiv = document.getElementById('data');
    }

    #getSubFromDom() {
        this.sub = document.getElementsByTagName('main')[0].dataset.sub;
    }

    #pushDataToNodes() {
        this.fetched.data.forEach(i => {
            const date = EFactory.create({ type: 'li'});
            const detailsUl = EFactory.create({ type: 'ul' });
            const type = EFactory.create({ type: 'li' });
            const notes = EFactory.create({ type: 'li' });

            const dateText = EFactory.create({ type:'text', msg: i.value.date })
            const typeText = EFactory.create({ type: 'text', msg: i.value.indicatorType })
            const notesText = EFactory.create({ type: 'text', msg: i.value.notes })

            date.appendChild(dateText);
            type.appendChild(typeText);
            notes.appendChild(notesText);
            detailsUl.appendChild(type);
            detailsUl.appendChild(notes)
            date.appendChild(detailsUl);
            this.orderedList.appendChild(date);
            this.#applyStyling(date);
        })
    }

    #loadData() {
            this.#loading(true);
            fetch(`api/records?usr=${this.sub}`)
                .then(response => response.json())
                .then(data => {
                    if (this.fetched.data instanceof Array && this.fetched.data.length === 0) this.#noDataReceived(this.domDataDiv);
                    else this.fetched.data = data[0].records.documents;
                })
                .then(() => this.#pushDataToNodes())
                .then(() => this.#loading(false))
                .catch(err => console.error(err));
    }

    #loading(state) {
        if (state === true) {
            const loadingText = 'Loading...';
            this.loadingTextNode = EFactory.create({type: 'text', msg: loadingText});
            this.loadingTextDiv = EFactory.create({ type: 'div' });
            this.loadingTextDiv.appendChild(this.loadingTextNode);
            this.domDataDiv.appendChild(this.loadingTextDiv);
            this.loadingTextDiv.classList.add('loading');
        }

        if (! state) {
            this.domDataDiv.removeChild(this.loadingTextDiv)
            this.loadingTextDiv.classList.remove('loading');

        }

    }
}
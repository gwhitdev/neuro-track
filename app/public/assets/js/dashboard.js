const myData = {};
const generatedElement = {element: null};
const loading = {dataLoading: false};

const getDataButton = document.getElementById('getData');
const btn = document.getElementById('create');
const dataDiv = document.getElementById('data');

if (loading.dataLoading === true) {
    const text = document.createTextNode('Loading');
    dataDiv.appendChild(text);
}

function clearCurrentDom() {
    if (generatedElement.element instanceof HTMLElement) {
        const div = document.getElementById('data');
        div.removeChild(generatedElement.element);
        myData.data = null;
    }
}

function createRandomKey() {
    return Math.floor(Math.random()*1000).toString();
}

function loadDataToDom() {
    if (myData.data instanceof Array && myData.data.length > 0) {
        const list = document.createElement('ol');
        const nodes = [];
        const listKey = createRandomKey();
        generatedElement.element = list;
        list.dataset.key = listKey;

        myData.data.forEach(i => {
            nodes.push({
                date: document.createTextNode(i.value.date),
                type: document.createTextNode(i.value.indicatorType),
                notes: document.createTextNode(i.value.notes),
                timestamp: document.createTextNode(i.value.timestamp)
            })
        })

        function createLi() {
            return document.createElement('li');
        }

        nodes.forEach(n => {
            const li = createLi();
            li.appendChild(n.date);
            const detailsUl = document.createElement('ul');
            const type = createLi();
            const notes = createLi();
            const timestamp = createLi();
            timestamp.appendChild(n.timestamp);
            type.appendChild(n.type);
            notes.appendChild(n.notes);
            detailsUl.appendChild(timestamp);
            detailsUl.appendChild(type);
            detailsUl.appendChild(notes)
            li.appendChild(detailsUl);
            list.appendChild(li);
        })
        dataDiv.append(list)
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('api/record', {
        method: 'POST',
        body: JSON.stringify({"user": btn.dataset.sub}),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(err => console.error(err))
})

getDataButton.addEventListener('click', (e) => {
    e.preventDefault();
    loading.dataLoading = true;
    fetch(`api/records?usr=${getDataButton.dataset.sub}`)
        .then(response => response.json())
        .then(data => {
            clearCurrentDom()
            console.log(data[0].records.documents)
            myData.data = data[0].records.documents;
            loadDataToDom()

        })
        .then(() => loading.dataLoading = true)
        .catch(err => console.error(err));
});
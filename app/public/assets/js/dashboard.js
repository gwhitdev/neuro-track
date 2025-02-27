const btn = document.getElementById('create');
const myData = {};

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

const getDataButton = document.getElementById('getData');
getDataButton.addEventListener('click', (e) => {

    e.preventDefault();
    fetch(`api/records?usr=${getDataButton.dataset.sub}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0].records.documents)
            myData.data = data[0].records.documents;
            loadDataToDom()
        })
        .catch(err => console.error(err));
});

const dataDiv = document.getElementById('data');

function createRandomKey() {
    return Math.floor(Math.random()*1000).toString();
}

const generatedElement = {element: null};

function clearCurrentDom() {
    const div = document.getElementById('data');
    div.removeChild(generatedElement.element);
}
function loadDataToDom() {
    if (myData.data.length > 0) {
        const list = document.createElement('ol');
        const nodes = [];
        const listKey = createRandomKey();
        generatedElement.element = list;
        list.dataset.key = listKey;

        myData.data.forEach(i => {
            nodes.push({
                date: document.createTextNode(i.value.date),
                type: document.createTextNode(i.value.indicatorType),
                notes: document.createTextNode(i.value.notes)
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
            type.appendChild(n.type);
            const notes = createLi();
            notes.appendChild(n.notes);
            detailsUl.appendChild(type);
            detailsUl.appendChild(notes)
            li.appendChild(detailsUl);
            list.appendChild(li);
        })
        dataDiv.append(list)

    }
}

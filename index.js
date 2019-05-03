const BASE_URL = 'http://localhost:3000';
let CURR_MONSTER_INDEX = 0;
let form = document.createElement('form')
let forwardButton = document.querySelector('#forward');
let backButton = document.querySelector('#back')
let divContainer = document.createElement('div')
document.body.appendChild(divContainer)

forwardButton.addEventListener('click', function(e) {
        fetch(`${BASE_URL}/monsters`)
            .then(response => response.json())
            .then(nextFiftyMonsters)
            .catch(error => console.error(error))
})

backButton.addEventListener('click', function() {
    fetch(`${BASE_URL}/monsters`)
        .then(response => response.json())
        .then(previousFiftyMonsters)
        .catch(error => console.error(error))
})

function createForm() {
    form.innerHTML = `
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button id="create-new-monster">Create Monster</button>
    `
    document.body.prepend(form)
}


function getFirstFiftyMonsters() {
    return fetch(`${BASE_URL}/monsters`)
        .then(response => response.json())
        .then(createAndRenderMonster)
        .catch(error => console.error(error))
}

function createAndRenderMonster(result) {
    for(let i = 0; i < 50; i++) {
        let div = document.createElement('div')
        div.innerHTML = `
            <h2>${result[i].name}</h2>
            <h4>Age: ${result[i].age}</h4>
            <p>Bio: ${result[i].description}</p>
        `
        divContainer.appendChild(div)
    }
}

function createNewMonster(e) {
    e.preventDefault();
    renderMonster();
    postNewMonster({
        name: nameInput.value, 
        age: ageInput.value, 
        description: descriptionInput.value
    })

    document.body.appendChild(div)
    form.reset();
}

function postNewMonster(data) {
    fetch(`http://localhost:3000/monsters`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
}

function renderMonster() {
    div.innerHTML = `
        <h2>${nameInput.value}</h2>
        <h4>Age: ${ageInput.value}</h4>
        <p>Bio: ${descriptionInput.value}</p>
    `
}

function nextFiftyMonsters(result) {
    // Remove the previous monsters from display
    if( CURR_MONSTER_INDEX + 50 > result.length) {
        alert('There are no monsters here');
    }
    else {
        CURR_MONSTER_INDEX += 50
        while(divContainer.firstElementChild) {
            divContainer.removeChild(divContainer.firstElementChild);
        }
        displayFiftyMonsters(result);
    }
}

function previousFiftyMonsters(result) {
    // Remove the current monsters from display
    console.log(CURR_MONSTER_INDEX)
    if( (CURR_MONSTER_INDEX - 50) < 0 ) {
        alert('There are no monsters here')
    }
    else {
        while(divContainer.firstElementChild) {
            divContainer.removeChild(divContainer.firstElementChild)
        }
        CURR_MONSTER_INDEX -= 50;
        displayFiftyMonsters(result);
    }
}

function displayFiftyMonsters(result) {
    for(let i = CURR_MONSTER_INDEX; i < (CURR_MONSTER_INDEX + 50) && (i < result.length); i++) {
        let div = document.createElement('div')
        div.innerHTML = `
            <h2>${result[i].name}</h2>
            <h4>Age: ${result[i].age}</h4>
            <p>Bio: ${result[i].description}</p>
        `
        divContainer.appendChild(div)
}
}

getFirstFiftyMonsters();
createForm();


let nameInput = document.querySelector('#name');
let ageInput = document.querySelector('#age');
let descriptionInput = document.querySelector('#description');    
let div = document.createElement('div')

let createMonsterButton = document.querySelector('#create-new-monster');
createMonsterButton.addEventListener('click', function(e) {
    createNewMonster(e);
})
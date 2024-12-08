function getRandomNumber(blackList) {
    let rng =  Math.floor(Math.random() * 1025 + 1);
    while (blackList.includes(rng)) {
        rng =  Math.floor(Math.random() * 1025 + 1);
    }

    return rng;
}

async function fetchPokemon() {
    gameCode = '';
    document.getElementById('gameContainer').innerHTML = '';
    let mainContainer = document.getElementById('mainContent');
    mainContainer.style = 'display: none;'
    let spinner = document.getElementById('loadingStatus');
    spinner.style = 'display: block;'
    numberBlackList = [0, 0];

    for (let i=0; i<24; i++) {
        let pokemonNumber = getRandomNumber(numberBlackList);
        gameCode = gameCode + pokemonNumber + ';';
        numberBlackList[i] = pokemonNumber;
        let response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonNumber).catch((err) => console.error(err));
        let obj = await response.json();  
        addPokemonCard(pokemonNumber, obj.name);
    }
    spinner.style = 'display: none;'
    mainContainer.style = 'display: block;';
}

function addPokemonCard(num, name) {
    let newCard = document.createElement('div');
    newCard.classList.add('pokemonCard');
    let newPokeImg = document.createElement('img');
    newPokeImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + num +'.png'
    let cardTitle = document.createElement('h1');
    cardTitle.textContent = name;
    newCard.appendChild(newPokeImg);
    newCard.appendChild(cardTitle);
    document.getElementById('gameContainer').appendChild(newCard);
}

function copiaCodigo() {
    let newInput = document.createElement('input');
    newInput.setAttribute('value', gameCode);
    document.body.appendChild(newInput);
    newInput.select();
    document.execCommand('copy');
    newInput.parentNode.removeChild(newInput);
}

function getGameCodeReady() {
    let externalGameCode = document.getElementById('inputCodigoExterno').value;
    let j = 0;
    coppiedGamePokemonList = ['', ''];
    for (let i=0; i<externalGameCode.length; i++) {
        if (externalGameCode.charAt(i) != ';') {
            coppiedGamePokemonList[j] = coppiedGamePokemonList[j] + externalGameCode.charAt(i)
        } else {
            j++;
            coppiedGamePokemonList[j] = '';
        }
    }
    geraTabuleiroCopiado(coppiedGamePokemonList);
}

async function geraTabuleiroCopiado(pokemonNumber) {
    gameCode = '';
    document.getElementById('gameContainer').innerHTML = '';
    let mainContainer = document.getElementById('mainContent');
    mainContainer.style = 'display: none;'
    let spinner = document.getElementById('loadingStatus');
    spinner.style = 'display: block;'

    for (let i=0; i<24; i++) {
        gameCode = gameCode + pokemonNumber[i] + ';';
        let response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonNumber[i]).catch((err) => console.error(err));
        let obj = await response.json();  
        addPokemonCard(pokemonNumber[i], obj.name);
    }
    spinner.style = 'display: none;'
    mainContainer.style = 'display: block;';
}

let numberBlackList;
let gameCode = '';
let coppiedGamePokemonList;
const novoTabuleiroBtn = document.querySelector('#novoJogoBtn');
novoTabuleiroBtn.addEventListener('click', fetchPokemon);

const copyGame = document.querySelector('#copiarTabuleiro');
copyGame.addEventListener('click', copiaCodigo);

const loadGameBtn = document.getElementById('carrgarTabuleiroBtn');
loadGameBtn.addEventListener('click', getGameCodeReady);
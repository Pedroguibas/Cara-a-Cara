function getRandomNumber(blackList) {
    let rng =  Math.floor(Math.random() * 1025 + 1);
    while (blackList.includes(rng)) {
        rng =  Math.floor(Math.random() * 1025 + 1);
    }

    return rng;
}

async function fetchPokemon() {
    gameCode = 'pkmngmcd:';
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
    getRandomCard();
}

function addPokemonCard(num, name) {
    let newCardContainer = document.createElement('div');
    newCardContainer.classList.add('pokemonCardContainer');
    newCardContainer.addEventListener('click', flipCard);

    let newCard = document.createElement('div');
    newCard.classList.add('pokemonCard');

    let newCardFront = document.createElement('div');
    newCardFront.classList.add('pokemonCardFront');

    let newCardBack = document.createElement('div');
    newCardBack.classList.add('pokemonCardBack')

    let newPokeImg = document.createElement('img');
    newPokeImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + num +'.png'

    let cardTitle = document.createElement('h1');
    cardTitle.textContent = name;

    let cardBackImg = document.createElement('img');
    cardBackImg.setAttribute('src', 'https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest/scale-to-width-down/732?cb=20140520015336');

    newCardFront.appendChild(newPokeImg);
    newCardFront.appendChild(cardTitle);
    newCardBack.appendChild(cardBackImg);
    newCard.appendChild(newCardFront);
    newCard.appendChild(newCardBack);
    newCardContainer.appendChild(newCard);
    document.getElementById('gameContainer').appendChild(newCardContainer);
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
    if (externalGameCode.includes('pkmngmcd:')) {
        let j = 0;
        coppiedGamePokemonList = ['', ''];
        for (let i=9; i<externalGameCode.length; i++) {
            if (externalGameCode.charAt(i) != ';') {
                coppiedGamePokemonList[j] = coppiedGamePokemonList[j] + externalGameCode.charAt(i)
            } else {
                j++;
                coppiedGamePokemonList[j] = '';
            }
        }
        geraTabuleiroCopiado(coppiedGamePokemonList);
    } else {
        document.getElementById('inputCodigoExterno').value = '';
        window.alert('Código invalido.');
    }
}

async function geraTabuleiroCopiado(pokemonNumber) {
    gameCode = 'pkmngmcd:';
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
    getRandomCard();
}

function getRandomCard() {
    document.getElementById('chosenCardContainer').innerHTML = '';
    let gameCards = document.querySelectorAll('.pokemonCardContainer');
    let cardNumber = Math.floor(Math.random() * 25 + 1);
    let chosenCard = document.createElement('div');
    chosenCard.classList.add('pokemonCardContainer');
    chosenCard.innerHTML = gameCards[cardNumber].innerHTML;
    document.getElementById('chosenCardContainer').appendChild(chosenCard);
}

function flipCard() {
    let card = this.querySelector('.pokemonCard');
    if (card.classList.contains('pokemonCardFlipped')) {
        card.classList.remove('pokemonCardFlipped');
    } else {
        card.classList.add('pokemonCardFlipped');
    }
}

let numberBlackList;
let gameCode = 'pkmngmcd:';
let coppiedGamePokemonList;
const novoTabuleiroBtn = document.querySelector('#novoJogoBtn');
novoTabuleiroBtn.addEventListener('click', fetchPokemon);

const copyGame = document.querySelector('#copiarTabuleiro');
copyGame.addEventListener('click', copiaCodigo);

const loadGameBtn = document.getElementById('carrgarTabuleiroBtn');
loadGameBtn.addEventListener('click', getGameCodeReady);
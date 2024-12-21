function getRandomNumber(blackList) {
    let rng;
    do {
        rng =  Math.floor(Math.random() * 1024);
    } while (blackList.includes(rng));

    return rng;
}

async function fetchPokemon() {
    gameCode = 'pkmngmcd:';
    document.getElementById('gameContainer').innerHTML = '';
    let mainContainer = document.getElementById('mainContent');
    mainContainer.style = 'display: none;'
    let spinner = document.getElementById('loadingStatus');
    spinner.style = 'display: block;'
    numberBlackList = [];
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').catch((err) => console.error(err));
    let pokemonArray = await response.json();

    for (let i=0; i<24; i++) {
        pokemonNumber = pokemonFiltered? getFilteredNumber(numberBlackList) : getRandomNumber(numberBlackList);

        gameCode = gameCode + pokemonNumber + ';';
        numberBlackList[i] = pokemonNumber;
        addPokemonCard(pokemonNumber+1, pokemonArray.results[pokemonNumber].name);
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
        coppiedGamePokemonList = [''];
        for (let i=9, j=0; i<externalGameCode.length; i++) {
            if (externalGameCode.charAt(i) != ';') {
                coppiedGamePokemonList[j] = coppiedGamePokemonList[j] + externalGameCode.charAt(i)
            } else {
                coppiedGamePokemonList[j] = parseInt(coppiedGamePokemonList[j]);
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
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').catch((err) => console.error(err));
    let pokemonArray = await response.json();

    for (let i=0; i<24; i++) {
        gameCode = gameCode + pokemonNumber[i] + ';';
        addPokemonCard(pokemonNumber[i]+1, pokemonArray.results[pokemonNumber[i]].name);
    }
    spinner.style = 'display: none;'
    mainContainer.style = 'display: block;';
    getRandomCard();
}

function getRandomCard() {
    let chosenCard = document.querySelector('#chosenCard');
    chosenCard.querySelector('.pokemonCardFront').innerHTML = '';
    let gameCards = document.querySelectorAll('.pokemonCardContainer');
    let cardNumber = Math.floor(Math.random() * 24 + 1);
    chosenCard.querySelector('.pokemonCardFront').innerHTML = gameCards[cardNumber].querySelector('.pokemonCardFront').innerHTML;
    document.getElementById('chosenCardContainer').appendChild(chosenCard);
    chosenCard.addEventListener('click', getRandomCard);
}

function flipCard() {
    let card = this.querySelector('.pokemonCard');
    if (card.classList.contains('pokemonCardFlipped')) {
        card.classList.remove('pokemonCardFlipped');
    } else {
        card.classList.add('pokemonCardFlipped');
    }
}

function unflipCards() {
    let flippedCards = document.querySelectorAll('.pokemonCardFlipped');
    for (let i=0; i<flippedCards.length; i++) {
        flippedCards[i].classList.remove('pokemonCardFlipped');
    }
}

function filtrarPokemon() {
    let selectedGen = document.querySelectorAll('.checkGen:checked');
    if (selectedGen.length != 0) {
        pokemonFiltered = true;
    } else {
        pokemonFiltered = false;
    }
    fetchPokemon();
}

function getRandomFilteredGen() {
    let selectedGen = document.querySelectorAll('.checkGen:checked');
    let randomGen = selectedGen[Math.floor(Math.random() * selectedGen.length)].value;
    let interval = [];
    switch (randomGen) {
        case 'gen1':
            interval[0] = 0;
            interval[1] = 150;
            break;

        case 'gen2':
            interval[0] = 151;
            interval[1] = 250;
            break;

        case 'gen3':
            interval[0] = 251;
            interval[1] = 385;
            break;

        case 'gen4':
            interval[0] = 386;
            interval[1] = 492;
            break;

        case 'gen5':
            interval[0] = 493;
            interval[1] = 648;
            break;

        case 'gen6':
            interval[0] = 649;
            interval[1] = 720;
            break;

        case 'gen7':
            interval[0] = 721;
            interval[1] = 808;
            break;

        case 'gen8':
            interval[0] = 809;
            interval[1] = 904;
            break;

        case 'gen9':
            interval[0] = 905;
            interval[1] = 1024;
            break;
    }

    return interval;
}

function getFilteredNumber(blackList) {
    let rng;
    interval = getRandomFilteredGen();
    do {
        rng =  Math.floor(Math.random() * (interval[0]-interval[1]) + interval[1]);
    } while (blackList.includes(rng));

    return rng;
}

let numberBlackList;
let gameCode = 'pkmngmcd:';
let coppiedGamePokemonList;
let pokemonFiltered = false;

const novoTabuleiroBtn = document.querySelector('#novoJogoBtn');
novoTabuleiroBtn.addEventListener('click', fetchPokemon);

const copyGame = document.querySelector('#copiarTabuleiro');
copyGame.addEventListener('click', copiaCodigo);

const loadGameBtn = document.getElementById('carrgarTabuleiroBtn');
loadGameBtn.addEventListener('click', getGameCodeReady);

const unflipCardsBtn = document.getElementById('unflipCards');
unflipCardsBtn.addEventListener('click', unflipCards)

const filterBtn = document.getElementById('filterBtn');
filterBtn.addEventListener('click', filtrarPokemon);
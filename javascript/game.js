function getRandomNumber(blackList) {
    let rng =  Math.floor(Math.random() * 1025 + 1);
    while (blackList.includes(rng)) {
        rng =  Math.floor(Math.random() * 1025 + 1);
    }

    return rng;
}

async function fetchPokemon() {
    //Declarando variáveis pois apesar de funcionar declarando-as dentro da estrutura do...while penso que não é o mais correto já que as variáveis são usadas fora da estrutura. 
    //Gostaria de poder dar fetch em todos os pokemon de uma vez ao carregar o site, isso deixaria a geração de tabuleiro mais rápida. Porém, a API limita a resposta para um array de 20 objetos.
    let pokemonNumber;
    let response;
    let obj;
    gameCode = 'pkmngmcd:';
    document.getElementById('gameContainer').innerHTML = '';
    let mainContainer = document.getElementById('mainContent');
    mainContainer.style = 'display: none;'
    let spinner = document.getElementById('loadingStatus');
    spinner.style = 'display: block;'
    numberBlackList = [0, 0];

    for (let i=0; i<24; i++) {
        do {
            pokemonNumber = getRandomNumber(numberBlackList);
            response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonNumber).catch((err) => console.error(err));
            obj = await response.json();
        } while (!usableGens.includes(obj.generation.name)) 

        gameCode = gameCode + pokemonNumber + ';';
        numberBlackList[i] = pokemonNumber;
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
        coppiedGamePokemonList = [];
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
        usableGens = ['']
        for (let i=0; i<selectedGen.length; i++) {
            usableGens[i] = selectedGen[i].value;
        }
    } else {
        usableGens = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii', 'generation-ix'];
    }
    fetchPokemon();
}

let numberBlackList;
let gameCode = 'pkmngmcd:';
let coppiedGamePokemonList;
let usableGens = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii', 'generation-ix'];

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
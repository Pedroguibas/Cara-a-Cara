function getRandomNumber(blackList) {
    let rng =  Math.floor(Math.random() * 1025 + 1);
    while (blackList.includes(rng)) {
        rng =  Math.floor(Math.random() * 1025 + 1);
    }

    return rng;
}

let numberBlackList;

async function fetchPokemon() {
    numberBlackList = [0, 0];
    for (let i=0; i<24; i++) {
        let pokemonNumber = getRandomNumber(numberBlackList);
        numberBlackList[i] = pokemonNumber;
        let response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonNumber).catch((err) => console.error(err));
        let obj = await response.json();  
        addPokemonCard(pokemonNumber, obj.name);
    }
}

function addPokemonCard(num, name) {
    let newCard = document.createElement('div');
    newCard.classList.add('pokemonCard');
    let newPokeImg = document.createElement('img');
    newPokeImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + num +'.png'
    let cardTitle = document.createElement('h3');
    cardTitle.textContent = name;
    newCard.appendChild(newPokeImg);
    newCard.appendChild(cardTitle);
    document.getElementById('gameContainer').appendChild(newCard);
}

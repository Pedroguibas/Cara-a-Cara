function getRandomNumber() {
    return Math.floor(Math.random() * 1025 + 1);
}

let numberBlackList;

async function fetchPokemon() {
    let pokemonNumber = getRandomNumber();
    let response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonNumber).catch((err) => console.error(err));
    let obj = await response.json();
    console.log(obj.name);
}

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon 
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url) //Buscando a requisição pela url 
    .then((response) => response.json()) // trazendo o resultado com method response trasformando em uma lista json
    .then((jsonBody) => jsonBody.results) // pegando o resultado json
    .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon))) // fanzendo cada resultado da lista json buscar uma nova requisição (requerimento do detalhe de cada pokemon em json)
    .then((detailRequest) => Promise.all(detailRequest)) // lista de promessa dos detalhes pokemons (esperando ser resolvida)
    .then((pokemonsDetails) => pokemonsDetails)//lista de detalhes do pokemon
    }

//Arrays de promises. Quando todas as promises forem executas sera feita a chamada do then(trazendo o results)
Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')
]) .then((results) =>{
    console.log(results)
})
// \\   render all trainers
    // \\   render pokemon teams for each trainer
        //  \\  fetch
        //  \\  transform
        //  \\  capture objects?
        //  \\  sort objects

// add pokemon button
    //  add pokemon to team if team.length < 6
    //  button actions
        //  needs trainer id
        //  check total pokemons

// each pokemon needs release button
    // remove from team => delete?


const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => data.forEach(trainer => handleTrainer(trainer)))
}

function handleTrainer(trainer) {
    let main = document.querySelector('main')

    let div = document.createElement('div')
    div.className = 'card'
    div.dataset.id = trainer.id

    let p = document.createElement('p')
    p.innerText = trainer.name

    div.appendChild(p)
    main.appendChild(div)

    handlePokemons(trainer.pokemons)
}

function handlePokemons(team){
    console.log(team)
    team.forEach(pokemon => buildPokemon(pokemon))
}

function buildPokemon(pokemon) {
    console.log(pokemon.trainer_id)

    let span = document.createElement('span')
    span.dataset.id = pokemon.id
    
    let p = document.createElement('p')
    p.innerText = `${pokemon.nickname} (${pokemon.species})`

    span.appendChild(p)

    let div = document.querySelectorAll('div')
    
    div.forEach(tab => {if (tab.dataset.id == pokemon.trainer_id)
                            tab.appendChild(span)})
}
fetchTrainers()
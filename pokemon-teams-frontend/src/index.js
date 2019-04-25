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

    let butt = document.createElement('button')
    butt.addEventListener('click', addPokemon)
    butt.innerText = 'Add Pokemon'
    butt.dataset.id = trainer.id

    let ul = document.createElement('ul')
    ul.dataset.id = trainer.id 
    div.appendChild(p)
    div.appendChild(butt)
    div.appendChild(ul)
    main.appendChild(div)

    handlePokemons(trainer.pokemons)
}

function handlePokemons(team){
    team.forEach(pokemon => buildPokemon(pokemon))
}

function buildPokemon(pokemon) {
    let li = document.createElement('li')
    li.dataset.id = pokemon.id
    li.className = 'Pokemon'
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    let delButt = document.createElement('button')
    delButt.className = "release"
    delButt.dataset.id = pokemon.id
    delButt.innerText = 'Release'
    delButt.addEventListener('click', releasePokemon)

    li.appendChild(delButt)

    let ul = document.querySelectorAll('ul')
    
    ul.forEach(tab => {if (tab.dataset.id == pokemon.trainer_id)
                            tab.appendChild(li)})
}

function addPokemon(e) {
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers:    {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokemon:    {trainer_id: e.target.dataset.id,
                        species: null,
                        nickname: null
                        }
            })
    })
    let div = e.target.parentElement
    div.querySelectorAll('.Pokemon').forEach(span => span.remove())
    fetch(TRAINERS_URL)
    .catch(error=>console.log('EVERYTHING IS ON FIRE!!!!!'))
    .then(resp => resp.json())
    .then(trainers => trainers.filter(trainer=>trainer.id == e.target.dataset.id))
    .then(trainer => trainer[0].pokemons)
    .then(team => handlePokemons(team))
    
}

function releasePokemon(e) {
    fetch(`${POKEMONS_URL}/${e.target.dataset.id}`, {
        method: 'DELETE'
    })
    e.target.parentElement.remove()
}

fetchTrainers()
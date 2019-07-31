const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainEl = document.querySelector('main')

// client side

const showTrainer = (trainer)  => {
    const cardEl = document.createElement('div')
    cardEl.classList.add("card")
    cardEl.dataset.id = trainer.id

    cardEl.innerHTML = 
    `
        <p>${trainer.name}</p>
        <button class='create' data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul>
            ${trainer.pokemons.map(showPokemon).join("")}
        </ul>

    `

    const createBtn = cardEl.querySelector('.create')
    const ulEl = cardEl.querySelector('ul')
    createBtn.addEventListener('click', () => {
        addPokemon(trainer.id)
        .then(pokemon => {
            if (pokemon.error) return 
           ulEl.innerHTML += `
           <li id='pokemon-${pokemon.id}'>
           ${pokemon.nickname} (${pokemon.species})
           <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
           </li>
       `
        })
    }) 
    mainEl.appendChild(cardEl)
}

const showPokemon = (pokemon) => {  
    return `
        <li id='pokemon-${pokemon.id}'>
        ${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
        </li>
    `
}

const showAllTrainers = (trainers) => {
    trainers.forEach(showTrainer)
}


//listeners 
const addPokemonRemoverListener = () => {
    document.addEventListener('click', event => {
        if (event.target.classList.contains('release')){
            const id = event.target.dataset.pokemonId
            const liEl = document.querySelector(`#pokemon-${id}`)
            deletePokemon(id)
            .then(() => {
                liEl.remove()
              })
              .catch(() => alert("Woops! Try again!"))
        }
    })
}



//server side
const deletePokemon = (pokemonId) => {
	return fetch(POKEMONS_URL + `/${pokemonId}`, {
		method: 'DELETE'
	}).then(resp => resp.json())
}

const getTrainers = () => {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
}

const addPokemon = (trainerId) => {
   return fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trainer_id: trainerId})
    }).then(resp => resp.json())
}

const initialize = () => {
    getTrainers()
    .then(showAllTrainers)
    addPokemonRemoverListener()
}

initialize()
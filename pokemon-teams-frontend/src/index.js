const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainEl = document.querySelector('main')

const getTrainers = () => {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
}

const showTrainer = (trainer)  => {
    const cardEl = document.createElement('div')
    cardEl.classList.add("card")
    cardEl.dataset.id = trainer.id



    cardEl.innerHTML = 
    `
        <p>${trainer.name}</p>
        <button data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul>
            ${trainer.pokemons.map(showPokemon).join("")}
        </ul>

    `

    mainEl.appendChild(cardEl)
}

const showPokemon = (pokemon) => {
    
    return `
        <li>
        ${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
        </li>
    `

}

const showAllTrainers = (trainers) => {
    trainers.forEach(showTrainer)
}

const initialize = () => {
    getTrainers()
    .then(showAllTrainers)
}

initialize()
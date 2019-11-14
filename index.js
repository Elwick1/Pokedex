document.addEventListener("DOMContentLoaded", function(){ 

// const elements = document.getElementsByClassName("column");
const pokedex = document.getElementById('pokedex');
const changeView = document.querySelector(".view-button")

function initialise() {
  fetchOriginalPokemon()
}

function fetchOriginalPokemon(){
  const promises = []

  for(let i = 1; i < 152; i++) {
    const baseURI = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(baseURI)
    .then(res => res.json()))
  }
  Promise.all(promises).then(pokemon => sortPokemon(pokemon))
}

function sortPokemon(pokemon) {
  console.log(pokemon)
  const pkmn = pokemon.map((pokemon) => ({
        name: pokemon.name,
        id: pokemon.id,
        image: pokemon.sprites.front_default,
        type: pokemon.types.map((type) => type.type.name).join(', '),
        moves: pokemon.moves.map((moves) => moves.move.name).join(', '),
        stats: pokemon.stats.map((stats) => stats.stat.name).join(','),
        statsNumber: pokemon.stats.map((stats) => stats.base_stat)
    }))
    // debugger
    renderPokemon(pkmn)
  }

  function renderPokemon(pkmn) {
    console.log(pkmn)

    for(const pokeman of pkmn){
      renderOnePokemon(pokeman)
    }
  }

function renderOnePokemon(pokeman){
  const name = pokeman.name
  const image = pokeman.image
  const type = pokeman.type
  const id = pokeman.id
  const moves = pokeman.moves
  const stats = pokeman.stats
  const statNumber = pokeman.base_stat
  const pokeDiv = document.createElement('div') 
  pokeDiv.classList.add = "row"

  pokeDiv.innerHTML = `
  <li class="card">
    <img class="card-image" src="${image}"/>
    <h2 class="card-title">${id}.${name}</h2>
    <p class="card-subtitle">Type: ${type}</p>
    <button class="catch">Catch Pokemon</button>
  </li>
  `
  pokedex.appendChild(pokeDiv)
  const catchPkmn = document.querySelector(".catch")
  catchPkmn.addEventListener("click", catchPokemon)
  // debugger
}

function catchPokemon(e) {
  debugger
}


/* <p class="moves"> Learnable Moves: ${moves}</p> */
/* <div class="row">
  <div class="column"></div>
  </div>
  </div> */
// const listView = document.createElement("button")
//   listView.classList.add("list")
//   listView.innerText = "Show As List"
//   listView.addEventListener("click", viewAsList)
//   const gridView = document.createElement("button")
//   gridView.classList.add("grid")
//   gridView.innerText = "Show As Grid"
//   gridView.addEventListener("click", viewAsGrid)
//   changeView.append(listView, gridView)

// function viewAsList(e) {
//   for (i = 0; i < elements.length; i++) {
//     elements[i].style.width = "100%";
//   }
// }

// function viewAsGrid(e) {
//   for (i = 0; i < elements.length; i++) {
//     elements[i].style.width = "50%";
//   }
// }

// const addLi = document.createElement("li")
//     addLi.classList.add = "card"

//     const addImg = document.createElement("img")
//     addImg.classList.add = "card-image"
//     addImg.src = pokeman.image

//     const addName = document.createElement("h2")
//     addName.classList.add = "card-title"
//     addName.innerText = pokeman.name

//     const addType = document.createElement("p")
//     addType.classList.add = "card-subtitle"
//     addType.innerText = pokeman.type

//     const createAddButton = document.createElement("button")
//     createAddButton.classList.add = "add-btn"
//     createAddButton.dataset.add = pokeman.id
//     createAddButton.innerText = "Catch Pokemon"

//     addLi.appendChild(addImg)
//     addLi.appendChild(addName)
//     addLi.appendChild(addType)
//     addLi.appendChild(createAddButton)

//     pokedex.appendChild(addLi)

initialise()

})
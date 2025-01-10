let pokedexArr =[];
let pokeImgArr =[];
let pokeIndexArr =[];
let pokeTypeArr = [];

let currentIndex = 0;

function init(){ 
   fetchDataJson();
}

async function fetchDataJson() { 
   let mainRef = document.getElementById('mainContainer');
   let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24&offset=0");
   let responseAsJson = await response.json();
   pokedexArr = responseAsJson.results;
  
   for (let i = 0; i < pokedexArr.length; i++) {
      let pokeIndex= await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);
      pokeIndexArr = await pokeIndex.json();
      pokeImgArr = pokeIndexArr.sprites.other.dream_world;
      
      pokeType = pokeIndexArr.types[0].type;
      let pokemon = pokedexArr[i];
      mainRef.innerHTML += getPokedexTemplate(pokemon, i, pokeImgArr, pokeType);
      getTypeElementJson(i);
   };
}

function getTypeElementJson(index){
   let typeRef = document.getElementById(`elementContent${index}`);
   for (let e = 0; e < pokeIndexArr.types.length; e++) {
      let poketypeElements = pokeIndexArr.types;
      let type = poketypeElements[e].type;
      console.log(pokeIndexArr.abilities);
      typeRef.innerHTML += getPokeElementTemplate(type);
   }
}

 async function openCard(i) {
   currentIndex = i;
   let cardContentRef = document.getElementById('pokemCardsContainer');
   cardContentRef.classList.remove("display_none");
   let pokeIndex= await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);
   pokeIndexArr = await pokeIndex.json();
   pokeImgArr = pokeIndexArr.sprites.other.dream_world;
   pokeType = pokeIndexArr.types[0].type;
   let pokemon = pokedexArr[i];
   cardContentRef.innerHTML = getPokeCardTemplate(i, pokemon, pokeImgArr, pokeIndexArr, pokeType);
   getCardTypeElementJson(i);
   getAbilities(i);
}

function getCardTypeElementJson(index){
   let typeCardRef = document.getElementById(`elements_type${index}`);
   for (let i = 0; i < pokeIndexArr.types.length; i++) {
      let poketypeElements = pokeIndexArr.types;
      let type = poketypeElements[i].type;
      console.log(pokeIndexArr.types);
      typeCardRef.innerHTML += getCardElementTemplate(type);
   }
}

function getAbilities(i){
   let spanRef = document.getElementById(`abilitiesSpan${i}`);
   for (let a = 0; a < pokeIndexArr.abilities.length; a++) {
      spanRef.innerHTML += `${pokeIndexArr.abilities[a].ability.name}, `
   }
}

function slideButton(direction){
   currentIndex += direction;

   if (currentIndex >= pokedexArr.length) {
      currentIndex = 0;
    }
    if (currentIndex < 0) {
      currentIndex = pokedexArr.length - 1;
    }
    openCard(currentIndex);
    return currentIndex;
}

function openBaseStatus(i){
   let aboutRef = document.getElementById('navContent1');
   let baseStatusRef = document.getElementById('navContent2');
   let abilitiesRef = document.getElementById('navContent3');
   aboutRef.classList.remove("content_box1");
   abilitiesRef.classList.remove("content_box3")
   aboutRef.classList.add("display_none");
   abilitiesRef.classList.add("display_none");
   baseStatusRef.classList.add("content_box2");
   let baseName = document.getElementsByClassName("base_status_content")[0];
   let progressBar = document.getElementsByClassName("progressbar_box")[0];

   for (let bs = 0; bs < pokeIndexArr.stats.length; bs++) {
      let stat = pokeIndexArr.stats[bs];
      baseName.innerHTML += getBaseNameTemplate(stat);
      progressBar.innerHTML +=getBaseProgressbarTemplate(stat);
   }
}

function openAbilities(i){
   let aboutRef = document.getElementById('navContent1');
   let baseStatusRef = document.getElementById('navContent2');
   let abilitiesRef = document.getElementById('navContent3');
   aboutRef.classList.remove("content_box1");
   aboutRef.classList.add("display_none");
   baseStatusRef.classList.remove("content_box2");
   baseStatusRef.classList.add("display_none");
   abilitiesRef.classList.add("content_box3");
   abilitiesRef.classList.remove("display_none");

   for (let a = 0; a < pokeIndexArr.abilities.length; a++) {
      let ability = pokeIndexArr.abilities[a].ability.name;
      abilitiesRef.innerHTML += getAbilitiesTemmplate(ability);
   }
}

function openMoves(i){

}
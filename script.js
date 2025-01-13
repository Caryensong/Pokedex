let pokedexArr =[];
let pokeIndexArr =[];
let currentIndex = 0;
let currentPokemon= 20;

function init(currentPokemon){ 
   fetchDataJson(currentPokemon);
}

function loadMore(){
   openLoadingScreen();
   currentPokemon += 20;
   init(currentPokemon);  
}

async function fetchDataJson(currentPokemon) { 
   let mainRef = document.getElementById('mainContainer');
   mainRef.innerHTML= "";
   let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${currentPokemon}&offset=0`);
   let responseAsJson = await response.json();
   pokedexArr = responseAsJson.results;
  
   for (let i = 0; i < pokedexArr.length; i++) {
      let pokeData= await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
      pokeIndexArr = await pokeData.json();
      let pokeImg = pokeIndexArr.sprites.other.dream_world;
      let pokeType = pokeIndexArr.types[0].type;

      mainRef.innerHTML += getPokedexTemplate(pokedexArr[i], i, pokeImg, pokeType);
      getTypeElements(i);
   };
}

function getTypeElements(index){
   let typeRef = document.getElementById(`elementContent${index}`);

   pokeIndexArr.types.forEach(type => {
      typeRef.innerHTML += getPokeElementTemplate(type.type);
   }); 
   }

 async function openCard(i) {
   currentIndex = i;
   document.getElementById('bodyId').style.overflow="hidden";
   let cardContentRef = document.getElementById('pokeCardsContainer');
   cardContentRef.classList.remove("display_none");

   let pokeData= await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);
   pokeIndexArr = await pokeData.json();
   let pokeImg = pokeIndexArr.sprites.other.dream_world;
   let pokeType = pokeIndexArr.types[0].type;

   cardContentRef.innerHTML = getPokeCardTemplate(i, pokedexArr[i], pokeImg, pokeIndexArr, pokeType);
   let navElement =document.getElementById('aboutNav');
   navElement.classList.toggle('active_btn');

   getCardTypeElements(i);
   getAbilities(i);
}

function getCardTypeElements(index){
   let typeCardRef = document.getElementById(`elements_type${index}`);
   for (let i = 0; i < pokeIndexArr.types.length; i++) {
      let poketypeElements = pokeIndexArr.types;
      let type = poketypeElements[i].type;
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
   const { aboutRef, baseStatusRef, abilitiesRef, movesRef, aboutNav, baseNav ,abilitiesNav ,moveNav  } = navContentID();
   baseNav.classList.add('active_btn');
   aboutNav.classList.remove('active_btn');
   abilitiesNav.classList.remove('active_btn');
   moveNav.classList.remove('active_btn');

   aboutRef.classList.remove("content_box1");
   abilitiesRef.classList.remove("content_box3")
   aboutRef.classList.add("display_none");
   abilitiesRef.classList.add("display_none");
   baseStatusRef.classList.add("content_box2");
   movesRef.classList.remove("content_box4");
   movesRef.classList.add("display_none");
   renderBaseStatus();
}

function renderBaseStatus() {
   let baseName = document.getElementsByClassName("base_status_content")[0];
   let progressBar = document.getElementsByClassName("progressbar_box")[0];
   baseName.innerHTML ="";
   progressBar.innerHTML ="";

   pokeIndexArr.stats.forEach(stat => {
      baseName.innerHTML += getBaseNameTemplate(stat);
      progressBar.innerHTML += getBaseProgressbarTemplate(stat);
  });
}

async function openAbilities(i){
   const { aboutRef, baseStatusRef, abilitiesRef, movesRef, aboutNav, baseNav ,abilitiesNav ,moveNav  } = navContentID();
   baseNav.classList.remove('active_btn');
   aboutNav.classList.remove('active_btn');
   abilitiesNav.classList.add('active_btn');
   moveNav.classList.remove('active_btn');

   aboutRef.classList.remove("content_box1");
   aboutRef.classList.add("display_none");
   baseStatusRef.classList.remove("content_box2");
   baseStatusRef.classList.add("display_none");
   abilitiesRef.classList.add("content_box3");
   abilitiesRef.classList.remove("display_none");
   movesRef.classList.remove("content_box4");
   movesRef.classList.add("display_none");

   renderAbilities(abilitiesRef);
}

async function renderAbilities(content){
   content.innerHTML = "";
for (let a = 0; a < pokeIndexArr.abilities.length; a++) {
   let ability = pokeIndexArr.abilities[a].ability.name;
   let effects = await fetchAbilitiesDataJson(pokeIndexArr.abilities[a]);
   content.innerHTML += getAbilitiesTemmplate(ability, effects);
}}

async function fetchAbilitiesDataJson(ability) {
      let response = await fetch(ability.ability.url);
      let responseAsJson = await response.json();
      return [responseAsJson.effect_entries[1].short_effect];   
}

function openMoves(i){
   const { aboutRef, baseStatusRef, abilitiesRef, movesRef, aboutNav, baseNav ,abilitiesNav ,moveNav } = navContentID();
   baseNav.classList.remove('active_btn');
   aboutNav.classList.remove('active_btn');
   abilitiesNav.classList.remove('active_btn');
   moveNav.classList.add('active_btn');

   aboutRef.classList.remove("content_box1");
   aboutRef.classList.add("display_none");
   baseStatusRef.classList.remove("content_box2");
   baseStatusRef.classList.add("display_none");
   abilitiesRef.classList.remove("content_box3");
   abilitiesRef.classList.add("display_none");
   movesRef.classList.add("content_box4");
   movesRef.classList.remove("display_none");

   renderOpenMoves();
}

function renderOpenMoves() {
   let movesBox = document.getElementById('moveBox');

   pokeIndexArr.moves.forEach(move=> {
      movesBox.innerHTML += getMovesTemplate(move);
      });
}

function navContentID() {
   return {
       aboutRef: document.getElementById('navContent1'),
       baseStatusRef: document.getElementById('navContent2'),
       abilitiesRef: document.getElementById('navContent3'),
       movesRef: document.getElementById('navContent4'),
       aboutNav: document.getElementById('aboutNav'),
       baseNav: document.getElementById('baseNav'),
       abilitiesNav: document.getElementById('abilitiesNav'),
       moveNav: document.getElementById('moveNav'),
   };
}

function openLoadingScreen(){
   let loadingScreenRef = document.getElementById('loadingScreen');
   loadingScreenRef.classList.add('load_screen');
   document.getElementById('bodyId').style.overflow="hidden";
   loadingScreenRef.innerHTML = getLoadingscreen();

   let progressBar = document.getElementById('loadingProgressbar');
   let width = 0;

   let interval = setInterval (() =>{
      width += 60;
      progressBar.style.width = width + 'px'; 

      if(width >= 300){
         clearInterval(interval);
         setTimeout(() =>{
            closeLoadingScreen();
         }, 1000);
     }
   },1000);
}

function closeLoadingScreen(){
   let loadingScreenRef = document.getElementById('loadingScreen');
   loadingScreenRef.classList.remove('load_screen');
   document.getElementById('bodyId').style.overflow = "auto";
   loadingScreenRef.innerHTML = '';
}

function closePokeCard(){
   let closeCardContent = document.getElementById('pokeCardsContainer');
   closeCardContent.classList.toggle('display_none');
   document.getElementById('bodyId').style.overflow = "auto";
}
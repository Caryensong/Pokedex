let pokedexArr =[];
let pokeIndexArr =[];
let currentIndex = 0;
let currentPokemon= 20;


function init() { 
   fetchDataJson();
}

async function fetchDataJson() { 
   let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=180&offset=0`);
   let responseAsJson = await response.json();
   pokedexArr = responseAsJson.results;
  
   renderPokemon(currentIndex, currentPokemon);
}

async function renderPokemon(startIndex, count) {
   let mainRef = document.getElementById('mainContainer');

   for (let i = startIndex; i < startIndex + count && i < pokedexArr.length; i++) {
      let pokeData= await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
      pokeIndexArr = await pokeData.json();
      let pokeImg = pokeIndexArr.sprites.other.dream_world;
      let pokeType = pokeIndexArr.types[0].type;

      mainRef.innerHTML += getPokedexTemplate(pokedexArr[i], i, pokeImg, pokeType);
      getTypeElements(i, pokeIndexArr );
   };
   currentIndex += count;
}

function getTypeElements(index, pokeIndexArr){
   let typeRef = document.getElementById(`elementContent${index}`);

   pokeIndexArr.types.forEach(type => {
      typeRef.innerHTML += getPokeElementTemplate(type.type);
   }); 
}

async function loadMore() {
   openLoadingScreen();   
   await renderPokemon(currentIndex, currentPokemon);
   closeLoadingScreen();
}

function openLoadingScreen(){
   let loadingScreenRef = document.getElementById('loadingScreen');
   loadingScreenRef.classList.add('load_screen');
   document.getElementById('bodyId').style.overflow="hidden";   
   loadingScreenRef.innerHTML = getLoadingscreen();

   let progressBar = document.getElementById('loadingProgressbar');
   renderProgressBar(progressBar);
}

function renderProgressBar(progressBar){
   const targetWidth = 300; 
   let width = 0;

   let interval = setInterval (() =>{
      width += 60;
      if (width >= targetWidth) {
         width = targetWidth;
         clearInterval(interval);
   }
   progressBar.style.width = width + 'px';
   progressBar.style.transition = "width 1s";

   renderLoadingRotateY(width);
   }, 100);
}

function renderLoadingRotateY(width){
      let imgRotation = document.getElementsByClassName('load_img');  
      
      for (let i = 0; i < imgRotation.length; i++) {
         imgRotation[i].style.transform = `rotateY(${width * 6}deg)`;
         imgRotation[i].style.transition = "transform 1s";
     }
}

function closeLoadingScreen(){
   let loadingScreenRef = document.getElementById('loadingScreen');
   loadingScreenRef.classList.remove('load_screen');
   document.getElementById('bodyId').style.overflow = "auto";
   loadingScreenRef.innerHTML = '';
}

 async function getSearchValue(){
   let searchValue = document.getElementById('searchInput').value.toLowerCase();
   let errorContent = document.getElementById('errorContent');

   let filterValueArr = pokedexArr
   .map((pokemon, index) => ({ pokemon, originalIndex: index })) 
   .filter(item => item.pokemon.name.toLowerCase().includes(searchValue));

   if (handleEmptySearch(searchValue, errorContent)) {
      return;
   }

   if (filterValueArr.length === 0) {
      displayErrorMessage(errorContent, `"${searchValue}" not found`);
      return;
   }

   showFilteredResults(filterValueArr);  

   document.getElementById('searchInput').value = "";
}

async function showFilteredResults(filterValueArr) { 
   let mainRef = document.getElementById('mainContainer');
   mainRef.innerHTML= "";
  
   for (let i = 0; i < filterValueArr.length; i++) {
      let valueIndex = filterValueArr[i].originalIndex;
      let pokeData= await fetch(`https://pokeapi.co/api/v2/pokemon/${valueIndex + 1}`);
      pokeIndexArr = await pokeData.json();
      let pokeImg = pokeIndexArr.sprites.other.dream_world;
      let pokeType = pokeIndexArr.types[0].type;
      mainRef.innerHTML += getPokedexTemplate(pokedexArr[valueIndex], valueIndex, pokeImg, pokeType);
      getTypeElements(valueIndex);
   };
}

function handleEmptySearch(searchValue, errorContent){
   if (!searchValue) {
      displayErrorMessage(errorContent, "Please enter a Pokémon name!");
      return true;
  }
  return false
}

function displayErrorMessage(errorContent, message){
   errorContent.innerText = message;
   setTimeout(() => {
   errorContent.innerHTML= "";
   }, 2000);
}

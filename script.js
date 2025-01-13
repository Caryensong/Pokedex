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

function openLoadingScreen(){
   let loadingScreenRef = document.getElementById('loadingScreen');
   loadingScreenRef.classList.add('load_screen');
   document.getElementById('bodyId').style.overflow="hidden";
   loadingScreenRef.innerHTML = getLoadingscreen();

   let progressBar = document.getElementById('loadingProgressbar');
   let width = 0;
   renderProgressBar(progressBar, width);
}

function renderProgressBar(progressBar, width){
   let interval = setInterval (() =>{
      width += 60;
      progressBar.style.width = width + 'px';
      progressBar.style.transition = "width 1s";

      renderLoadingRotateY(width);

      if(width >= 300){
         clearInterval(interval);
         setTimeout(() =>{
            closeLoadingScreen();
         }, 1000);
     }
   },1000);
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

function getSearchValue(){
   let searchValue = document.getElementById('searchInput').value.toLowerCase();
   let index = pokedexArr.findIndex(pokemon => pokemon.name.toLowerCase().includes(searchValue));
   if (index != -1) {
      console.log('gefunden:',pokedexArr[index].name);
      openCard(index);
      
   }else{
      console.log('falsch');
      
   }
   document.getElementById('searchInput').value = "";
}
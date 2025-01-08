let pokedexArr =[];
let pokeImgArr =[];
let pokeIndexArr =[];
let pokeTypeArr = [];

function init(){ 
   fetchDataJson();
}

async function fetchDataJson() { 
   let mainRef = document.getElementById('mainContainer');
   let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15&offset=0");
   let responseAsJson = await response.json();
   pokedexArr = responseAsJson.results;
  
   for (let i = 0; i < pokedexArr.length; i++) {
      let pokeIndex= await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);
      pokeIndexArr = await pokeIndex.json();
      pokeImgArr = pokeIndexArr.sprites;
      pokeType = pokeIndexArr.types[0].type;
      let pokemon = pokedexArr[i];
      mainRef.innerHTML += getPokedexTemplate(pokemon, i, pokeImgArr, pokeType);
      fetchTypeElementJson(i);
   };
    
}

function fetchTypeElementJson(index){
   let typeRef = document.getElementById(`elementContent${index}`);
   for (let e = 0; e < pokeIndexArr.types.length; e++) {
      let poketypeElements = pokeIndexArr.types;
      let type = poketypeElements[e].type;
      console.log(pokeIndexArr.types);
      typeRef.innerHTML += getPokeElementTemplate(type);
   }
}

function  getPokedexTemplate(pokemon, i, img, type){
   return `
   <div class="pokemon_box">
           <div class="box_headline ${type.name}"></div>
            <div class="pokeimg_bg ${type.name}">
            <img class="pokeimg_b_img" src="./assets/icon/${type.name}_icon.png" alt="${type.name}"></div>
            <img class="pokemon_img" src="${img.front_default}" alt="Pokemon">
             <span class="poke_Name"># ${i +1} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
      <div id="elementContent${i}" class="element_content"></div>
             
   </div>`
}

function getPokeElementTemplate(type){
   return `
      <div class="element_ball ${type.name}_element"><img src="./assets/icon/${type.name}_icon.png" alt="${type.name}">${type.name}</div>
   `
}
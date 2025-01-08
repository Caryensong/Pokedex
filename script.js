let pokedexArr =[];
let pokeImgArr =[];

function init(){ 
   fetchDataJson();
}

async function fetchDataJson() {
   let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
   let responseAsJson = await response.json();
   pokedexArr = responseAsJson.results;
   let mainRef = document.getElementById('mainContainer');
   for (let i = 0; i < pokedexArr.length; i++) {
      let pokeIndex= await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);
      let pokeIndexJson = await pokeIndex.json();
      pokeImgArr = pokeIndexJson.sprites;
      pokeType = pokeIndexJson.types[0].type;
      console.log(pokeType);
      let pokemon = pokedexArr[i];
      mainRef.innerHTML += getPokedexTemplate(pokemon, i, pokeImgArr, pokeType);

   };
}

function  getPokedexTemplate(pokemon, i, img, type){
   return `
   <div class="pokemon_box">
           <div class="box_headline"></div>
            <div class="pokeimg_bg"><img src="${img.front_default}" alt="Pokemon"></div>   
             <span class="poke_Name">#${i +1} ${pokemon.name}</span>

             <div id="elementContent">
               <div class="element_ball"><img src="./assets/icon/${type.name}_icon.png" alt="fire"></div>
             </div>`
}

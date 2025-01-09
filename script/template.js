function  getPokedexTemplate(pokemon, i, img, type){
   return `
   <div class="pokemon_box">
           <div class="box_headline ${type.name}"></div>
            <div class="pokeimg_bg ${type.name}"></div>
            <img class="pokeimg_b_img" src="./assets/icon/${type.name}_icon.png" alt="${type.name}">
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
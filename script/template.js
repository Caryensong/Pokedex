function  getPokedexTemplate(pokemon, i, img, type){
   return `
   <div onclick="openCard(${i})" class="pokemon_box">
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

 function getPokeCardTemplate(pokemon, pokeImgArr, pokeIndexArr, type){
   return `
   <img class="back_file hover" src="./assets/icon/back_icon.png" alt="back">
      

      <div class="poke_cards">
         
         <div class="poke_name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>

         <div class="card_nav ${type.name}_element">  
            <a href="#">About</a>
            <a href="#">Base Status</a>
            <a href="#">Abilities</a>
            <a href="#">Moves</a>
         </div>

         <div id="navContent1" class="content_box1">

            <div class="span_content_title">
            <span class="span_title">Species</span>
            <span class="span_title">Height</span>
            <span class="span_title">Weight</span>
            <span class="span_title">Abilities </span>
            </div>

            <div class="span_content_title">
               <span class="span_text">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
               <span class="span_text">${pokeIndexArr.height} m</span>
               <span class="span_text">${pokeIndexArr.weight} kg</span>
               <span class="span_text">${pokeIndexArr.abilities[0].ability.name},   </span>
            </div>

         </div>

         <img class="poke_icon" src="./assets/icon/${type.name}_icon.png">
         <img class="poke_character" src="${pokeImgArr.front_default}" alt="Pokemon">
      </div>

      <img class="next_file hover" src="./assets/icon/next_icon.png" alt="next">
   
   `
 }
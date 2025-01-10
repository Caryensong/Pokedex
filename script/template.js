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

function getCardElementTemplate(type){
   return `
   <div class="card_element ${type.name}_element"><img src="./assets/icon/${type.name}_icon.png" alt="${type.name}"></div>
`
}

 function getPokeCardTemplate(i, pokemon, pokeImgArr, pokeIndexArr, type){
   return `
   <img onclick="slideButton(-1)" class="back_file hover" src="./assets/icon/back_icon.png" alt="back">
      
      <div class="poke_cards">
         
         <div class="poke_name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
         
         <div class="card_nav ${type.name}_element">  
            <a onclick="opencard(${i})"href="#navContent1">About</a>
            <a onclick="openBaseStatus(${i})" href="#">Base Status</a>
            <a onclick="openAbilities(${i})" href="#">Abilities</a>
            <a onclick="openMoves(${i})" href="#">Moves</a>
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
               <span id="abilitiesSpan${i}" class="span_text"></span>
            </div>
         </div>

         <div id="navContent2" class="">
          <div class="base_status_content"></div>
          <div class="progressbar_box"></div>
         </div>

         <div id="navContent3" class=""></div>

            <img class="poke_icon" src="./assets/icon/${type.name}_icon.png">
            <img class="poke_character" src="${pokeImgArr.front_default}" alt="Pokemon">
         </div>

      <img onclick="slideButton(1)" class="next_file hover" src="./assets/icon/next_icon.png" alt="next">

      <div id="elements_type${i}" class="cards_content"></div>
   `
 }

 function getBaseNameTemplate(stat){
   return `<span class="span_title">${stat.stat.name}</span>`
 }

 function getBaseProgressbarTemplate(stat){
   return`<div class="progress_bar"style="width: ${stat.base_stat}%">${stat.base_stat}%</div>`
 }

 function getAbilitiesTemmplate(ability, effect){
   return`
   <div class="abilites_content_title">
      <span class="span_title">${ability}</span>
      <span class="ability_text">${effect}</span>
   </div>
   `
 }
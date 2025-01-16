function  getPokedexTemplate(pokemon, i, img, type, types){
   const gradient = types.length > 1
   ? `linear-gradient(to right, var(--${types[0]}), var(--${types[1]}))`
   : `linear-gradient(to right, var(--${types[0]}), var(--${types[0]}))`;

   return `
   <div onclick="openCard(${i})" class="pokemon_box">
           <div class="box_headline" style="background: ${gradient};"></div>
            <div class="pokeimg_bg" style="background: ${gradient};"></div>
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

function getPokeCardTemplate(i, pokemon, pokeImg, pokeIndexArr, type){
   return `
    <div onclick="event.stopPropagation()" id="pokeCardsContainer" class="poke_cards_box">
   <img onclick="slideButton(-1)" class="back_file hover" src="./assets/icon/back_icon.png" alt="back">
      
      <div class="poke_cards">
         
         <div class="poke_name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
         
         <div class="card_nav ${type.name}_element">  
            <a onclick="openCard(${i})" href="#" id="aboutNav" class="">About</a>
            <a onclick="openBaseStatus(${i})" href="#" id="baseNav" class="">Base Status</a>
            <a onclick="openAbilities(${i})" href="#" id="abilitiesNav" class="">Abilities</a>
            <a onclick="openMoves(${i})" href="#" id="moveNav" class="">Moves</a>
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
               <span class="span_text">${pokeIndexArr.height}0 cm</span>
               <span class="span_text">${pokeIndexArr.weight}00 g</span>
               <span id="abilitiesSpan${i}" class="span_text"></span>
            </div>
         </div>

         <div id="navContent2" class="">
          <div class="base_status_content"></div>
          <div class="progressbar_box"></div>
         </div>

         <div id="navContent3" class=""></div>

         <div id="navContent4" class="display_none">
            <div id="moveConent">
               <div class="span_content_title">
               <span class="span_title">Moves</span>
               <div id="moveBox"></div>
            </div>
         </div>

         </div>

            <img class="poke_icon" src="./assets/icon/${type.name}_icon.png">
            <img class="poke_character" src="${pokeImg.front_default}" alt="Pokemon">
         </div>

      <img onclick="slideButton(1)" class="next_file hover" src="./assets/icon/next_icon.png" alt="next">

      <div id="elements_type${i}" class="cards_content"></div>
       <div onclick="closePokeCard()" class="close_btn">x</div>
     </div>
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
      <span class="abilities_title">${ability}</span>
      <span class="ability_text">${effect}</span>
   </div>
   `
}

function getMovesTemplate(move){
   return`
   <span class="move_text">${move.move.name},</span>
   `
}

function getLoadingscreen(){
   return `
   <div class="loading_bar_content">
      <p>LOADING ...</p>
      <div class="loadingProgressbar">
      <div id="loadingProgressbar" style="width: 0;  background-color: #b68603;"></div>
      <img class="load_img" style="transition: 0;"src="./assets/loading_img.png" alt="POKEMON">
      </div>
   </div>
`
}
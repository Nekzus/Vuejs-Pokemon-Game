<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>

    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />

    <PokemonOptions :pokemons="pokemonArr" @selection-pokemon="checkAnswer" />

    <template v-if="showAnswer" class="fade-in">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";

import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  name: "PokemonPage",
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixpokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;
      if (selectedId === this.pokemon.id) {
        this.message = `Correcto, ${this.pokemon.name.toUpperCase()}`;
      } else {
        this.message = `Oops, era ${this.pokemon.name.toUpperCase()}`;
      }
    },
    newGame() {
      this.showAnswer = false;
      this.showPokemon = false;
      this.pokemon = null;
      this.pokemonArr = [];
      this.mixpokemonArray();
    },
  },
  mounted() {
    this.mixpokemonArray();
  },
};
</script>
<style scoped>
template {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
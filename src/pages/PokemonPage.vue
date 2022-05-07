<template>
  <h1>¿Quién es este pokémon?</h1>

  <PokemonPicture :pokemonId="85" :showPokemon="true" />

  <PokemonOptions />
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";

export default {
  name: "PokemonPage",
  components: {
    PokemonPicture,
    PokemonOptions,
  },
};
</script>
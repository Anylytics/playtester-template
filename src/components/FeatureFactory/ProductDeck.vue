<template>
  <div class="">
    <b-loading :active.sync="loading" :can-cancel="true"></b-loading>
    <b-button type="is-light" v-on:click="uploadFile">Upload Deck</b-button>
    <div class="product-deck card" v-if="easyProducts" v-on:click="drawEasy">
      <img src="@/assets/logo.svg" />
    </div>
    <div class="product-deck card" v-if="hardProducts" v-on:click="drawHard">
      <img src="@/assets/logo.svg" />
      <img src="@/assets/logo.svg" />
    </div>
  </div>
</template>
<script>
import Deck from '@/utils/deckGenerator';
import Storage from '@/utils/storage';
import GameState from './gameStore';

const productDecks = {};

function flattenData(industryProducts) {
  const easyDeck = [];
  const hardDeck = [];
  Object.values(industryProducts).forEach((thisIndustry) => {
    Object.values(thisIndustry).forEach((thisProduct) => {
      if (thisProduct.value > 6) {
        hardDeck.push(thisProduct);
        return;
      }
      easyDeck.push(thisProduct);
    });
  });
  return { easyDeck, hardDeck };
}

export default {
  name: 'ProductDeck',
  data() {
    return {
      loading: false,
      easyProducts: null,
      hardProducts: null,
    };
  },
  methods: {
    uploadFile() {
      this.loading = true;
      Storage.uploadWork().then((data) => {
        this.loading = false;
        const products = JSON.parse(data.PRODUCTS);
        const { easyDeck, hardDeck } = flattenData(products);
        productDecks.easy = new Deck(easyDeck);
        productDecks.hard = new Deck(hardDeck);
        productDecks.easy.shuffle();
        productDecks.hard.shuffle();
        this.easyProducts = productDecks.easy.deck;
        this.hardProducts = productDecks.hard.deck;
      });
    },
    drawEasy() {
      const card = productDecks.easy.draw();
      console.log(card);
      GameState.commit('addCard', card);
    },
    drawHard() {
      const card = productDecks.hard.draw();
      console.log(card);
      GameState.commit('addCard', card);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-deck {
  margin: 8px;
  height: 128px;
  border-radius: 6px;
  background: #ecf0f1;
}
.product-deck > img {
  height: 48px;
  margin-top: 40px;
  padding: 0 8px;
}
</style>

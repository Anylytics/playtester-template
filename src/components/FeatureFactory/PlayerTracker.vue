<template>
  <div>
    <span>Players</span>
    <div class="resource-container">
      <div>
        <b-tag>Actions: {{ actionDeck.deck.length }}</b-tag>
        <b-tag>Drawn: {{ actionDeck.drawn.length }}</b-tag>
        <b-tag type="is-primary" v-if="drafting">Drafting</b-tag>
        <b-button v-on:click="shuffle()">Reshuffle</b-button>
        <b-button v-on:click="setDrafting()">Toggle Card Drafting</b-button>
        <!-- <b-button v-on:click="addPlayer()">Add Player</b-button> -->
      </div>
      <div>
        <b-tabs v-model="activePlayer">
          <template v-for="(player, i) in players">
            <b-tab-item :label="getPlayerLabel(player)" :key="i">
              <div v-if="userName === player.name">
                <h4>Hand</h4>
                <div class="columns">
                  <div class="column" v-for="(card, c) in player.hand" :key="c">
                    <b-button
                      class="card"
                      :style="{ border: `solid 4px ${card.background}` }"
                      v-on:click="playCard(i, c)"
                      >{{ card.name }}</b-button
                    >
                  </div>
                </div>
              </div>
              <h4>Drawn</h4>
              <div
                v-for="(card, k) in player.reserve"
                :key="`${card.name}_${k}`"
              >
                <div
                  :style="{
                    border: `solid 4px ${card.background}`,
                    textAlign: 'left',
                  }"
                >
                  <b-tag>Day {{ k + 1 }}</b-tag
                  >{{ card.name }}
                </div>
              </div>
            </b-tab-item>
          </template>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import GameStore from './gameStore';

export default {
  name: 'UserPanel',
  methods: {
    addPlayer() {
      this.$buefy.dialog.prompt({
        message: 'Player details',
        inputAttrs: {
          type: 'text',
          placeholder: 'Type your name',
        },
        trapFocus: true,
        onConfirm: (value) => GameStore.commit('addPlayer', value),
      });
    },
    playCard(playerIdx, cardIdx) {
      GameStore.commit('drawCardFromPlayer', {
        playerIdx,
        cardIdx,
      });
    },
    shuffle() {
      GameStore.commit('shuffleActions');
    },
    setDrafting() {
      GameStore.commit('toggleDrafting');
    },
    getPlayerLabel(player) {
      const user = this.userName;
      if (player.name === user) {
        return `😎    ${player.name}    😎`;
      }
      return player.name;
    },
  },
  data() {
    return {
      activePlayer: 0,
    };
  },
  computed: {
    drafting: () => GameStore.state.drafting,
    players: () => GameStore.state.players,
    actionDeck: () => GameStore.state.actions,
    ...mapState({
      userName: (s) => s.userInfo.userName,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resource-container {
  width: 100%;
  max-height: 240px;
  padding: 16px;
  white-space: normal;
  overflow-y: auto;
}
.container {
  padding: 16px;
}
.card {
  min-height: 64px;
}
</style>

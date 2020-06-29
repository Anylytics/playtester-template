<template>
  <div>
    <div class="columns">
      <div class="column">
        <span>Players</span>
      </div>
      <div class="column" v-if="drafting">
        <b-tag class="column animated fadeIn infinite" type="is-danger"
          >Drafting!</b-tag
        >
      </div>
    </div>
    <div class="resource-container">
      <div>
        <b-tabs v-model="activePlayer">
          <template v-for="(player, i) in players">
            <b-tab-item :label="getPlayerLabel(player)" :key="i">
              <div v-if="userName === player.name">
                <h4 v-if="player.hand.length > 0">Hand</h4>
                <div class="columns">
                  <div class="column" v-for="(card, c) in player.hand" :key="c">
                    <b-button
                      class="card action-card"
                      :style="{ background: `${card.background}` }"
                      v-on:click="keepCard(i, c)"
                      >{{ card.name }}</b-button
                    >
                  </div>
                </div>
              </div>
              <h4 v-if="player.reserve.length > 0">Drawn</h4>
              <div class="columns">
                <div
                  v-for="(card, k) in player.reserve"
                  :key="`${card.name}_${k}`"
                  class="column"
                >
                  <b-button
                    class="card action-card"
                    :style="{ background: `${card.background}` }"
                    v-on:click="playCard(card, i, k)"
                    >{{ card.name }}</b-button
                  >
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
    keepCard(playerIdx, cardIdx) {
      GameStore.commit('drawCardFromPlayer', {
        playerIdx,
        cardIdx,
      });
    },
    playCard(card, playerIdx, cardIdx) {
      const user = this.userName;
      const cardName = card.name.toString();
      GameStore.commit('playCard', {
        playerIdx,
        cardIdx,
        user,
        cardName,
      });
    },
    getPlayerLabel(player) {
      const user = this.userName;
      if (player.name === user) {
        return `👉    ${player.name}    👈`;
      }
      return player.name;
    },
    setDrafting() {
      GameStore.commit('toggleDrafting');
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
.action-card {
  font-family: Routed Gothic Wide;
  width: 112px;
  height: 128px;
  overflow: hidden;
  white-space: initial;
  color: white;
  border: none;
}
</style>

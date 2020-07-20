<template>
  <div>
    <div class="columns">
      <div class="column">
        <span>Players</span>
      </div>
      <div class="column" v-if="drafting">
        <b-tag class="column animated fadeIn infinite" type="is-danger">Drafting!</b-tag>
      </div>
    </div>
    <div class="resource-container">
      <div>
        <b-tabs v-model="activePlayer">
          <template v-for="(player, i) in players">
            <b-tab-item :label="getPlayerLabel(player)" :key="i">
              <div v-if="userName === player.name">
                <h4 class="is-size-4" v-if="player.hand.length > 0">Hand</h4>
                <div class="columns">
                  <div class="column" v-for="(card, c) in player.hand" :key="c">
                    <b-button
                      class="card action-card"
                      :style="{ background: `${card.background}` }"
                      v-on:click="keepCard(i, c)"
                    >{{ card.name }}</b-button>
                  </div>
                </div>
                <h4 class="is-size-4" v-if="player.reserve.length > 0">Drawn</h4>
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
                    >{{ card.name }}</b-button>
                  </div>
                </div>
              </div>
              <!-- <div
                :style="
                  userName === player.name
                    ? {}
                    : { pointerEvents: 'none', cursor: 'not-allowed' }
                "
              >-->
              <div>
                <h2 class="is-size-4">The Office</h2>
                <OfficePlan
                  :identifier="`${officePlanId}_${i}`"
                  :plandata="players[i].officeplan"
                  :onChange="setPlan.bind(null, i)"
                  :planidx="players[i].playerplan"
                />
              </div>
            </b-tab-item>
          </template>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import getRandId from '@/utils/randId';
import { mapState } from 'vuex';
import OfficePlan from './OfficePlan.vue';
import GameStore from './gameStore';

export default {
  name: 'UserPanel',
  components: { OfficePlan },
  methods: {
    keepCard(playerIdx, cardIdx) {
      GameStore.commit('drawCardFromPlayer', {
        playerIdx,
        cardIdx,
      });
    },
    setPlan(playerIdx, seat, color) {
      GameStore.commit('setPlayerPlan', {
        playerIdx,
        seat,
        color,
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
      console.log(player);
      let hand = '';
      if (this.drafting) {
        const toDraft = player.hand ? player.hand.length : '?';
        const drafted = player.reserve ? player.reserve.length : '?';
        hand = `(${toDraft} / ${drafted})`;
      }
      if (player.name === user) {
        return `👉    ${player.name} ${hand}   👈`;
      }
      return `${player.name} ${hand}`;
    },
    setDrafting() {
      GameStore.commit('toggleDrafting');
    },
  },
  data() {
    return {
      activePlayer: 0,
      officePlanId: getRandId(),
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

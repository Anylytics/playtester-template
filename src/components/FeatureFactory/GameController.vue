<template>
  <div>
    <div>
      <b-button v-on:click="shuffle()">DEAL</b-button>
      <b-button v-on:click="setDrafting()">{{ draftBtnTxt }}</b-button>
      <!-- <b-button v-on:click="addPlayer()">ADD PLAYER</b-button> -->
      <hr />
      <div class="columns">
        <div class="column">
          <b-tag>Actions: {{ actionDeck.deck.length }}</b-tag>
          <b-tag>Drawn: {{ actionDeck.drawn.length }}</b-tag>
          <b-tag type="is-primary" v-if="drafting">Drafting</b-tag>
          <b-button v-on:click="passHands()" v-if="drafting" size="is-small"
            >PASS HANDS</b-button
          >
          <hr />

          <WeekTracker />
          <DayTracker />
        </div>
        <div class="column">
          <h3>Waiting in Lobby</h3>
          <b-button
            v-for="(player, l) in lobbyPlayers"
            v-bind:key="l"
            :icon-left="lobbyInGameIcons[player].icon"
            :type="lobbyInGameIcons[player].type"
            v-on:click="addPlayer(player)"
            >{{ player }}</b-button
          >

          <b-table
            :data="journal"
            :columns="journalColumns"
            :narrowed="true"
            :striped="true"
            :sticky-header="true"
          ></b-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { genRandomUserName } from '@/utils';
import { mapState } from 'vuex';
import WeekTracker from './WeekTracker.vue';
import DayTracker from './DayTracker.vue';
import GameStore from './gameStore';

export default {
  name: 'GameController',
  components: {
    WeekTracker,
    DayTracker,
  },
  computed: {
    drafting: () => GameStore.state.drafting,
    actionDeck: () => GameStore.state.actions,
    journal: () => GameStore.state.gameJournal,
    gamePlayers: () => GameStore.state.players.map((player) => player.name),
    draftBtnTxt: () => {
      if (GameStore.state.drafting === true) return 'STOP DRAFTING';
      return 'START DRAFTING';
    },
    ...mapState({
      lobbyPlayers: (s) => s.userInfo.allUsers,
    }),
    lobbyInGameIcons: function lobbyInGameIcons() {
      const joinedIcon = 'account-check';
      const userIcon = 'account';
      return this.lobbyPlayers.reduce((output, player) => {
        const joined = this.gamePlayers.indexOf(player) > -1;
        /* eslint-disable-next-line */
        output[player] = {
          icon: joined ? joinedIcon : userIcon,
          type: joined ? 'is-success' : 'is-light',
        };
        return output;
      }, {});
    },
  },
  data() {
    return {
      journalColumns: [
        {
          field: 'week',
          label: 'Week',
          width: '1',
          numeric: true,
        },
        {
          field: 'day',
          label: 'Day',
          width: '1',
          numeric: true,
        },
        {
          field: 'msg',
          label: 'Activity',
          width: '40',
          numeric: false,
        },
        {
          field: 'ts',
          label: 'Timestamp',
          width: 10,
          numeric: false,
        },
      ],
    };
  },
  methods: {
    addPlayer(name) {
      if (this.gamePlayers.indexOf(name) > -1) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `${name} is already in the game!`,
          type: 'is-warning',
        });
        return;
      }
      GameStore.commit('addPlayer', name);
    },
    shuffle() {
      GameStore.commit('shuffleActions');
    },
    setDrafting() {
      GameStore.commit('toggleDrafting');
    },
    passHands() {
      GameStore.commit('passHands');
    },
  },
};
</script>

<style scoped></style>

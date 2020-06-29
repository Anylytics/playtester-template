<template>
  <div>
    <div>
      <b-button v-on:click="shuffle()">DEAL</b-button>
      <b-button v-on:click="setDrafting()">{{draftBtnTxt}}</b-button>
      <b-button v-on:click="addPlayer()">ADD PLAYER</b-button>
      <hr />
      <div class="columns">
        <div class="column">
          <b-tag>Actions: {{ actionDeck.deck.length }}</b-tag>
          <b-tag>Drawn: {{ actionDeck.drawn.length }}</b-tag>
          <b-tag type="is-primary" v-if="drafting">Drafting</b-tag>
          <b-button v-on:click="passHands()" v-if="drafting" size="is-small">PASS HANDS</b-button>
          <hr />

          <WeekTracker />
          <DayTracker />
        </div>
        <div class="column">
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
import { genRandomUserName } from '@/utils';
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
    draftBtnTxt: () => {
      if (GameStore.state.drafting === true) return 'STOP DRAFTING';
      return 'START DRAFTING';
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
      ],
    };
  },
  methods: {
    addPlayer() {
      GameStore.commit('addPlayer', genRandomUserName());
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

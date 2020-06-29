import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store';
import mutations from '@/mutations';
import Week from './GameClasses/Week';
import Player from './GameClasses/Player';
import ActionDeck from './GameClasses/ActionDeck';
import Day from './GameClasses/Day';
import GameStateBroadcaster from './GameClasses/GameStateBroadcaster';

Vue.use(Vuex);

function getNext(currentIndex, arr) {
  const len = arr.length;
  if (currentIndex + 1 === len) return arr[0];
  return arr[currentIndex + 1];
}

function copyObj(o) {
  return JSON.parse(JSON.stringify(o));
}

const WEEKSINGAME = 12;
const DAYSINWEEK = 5;
const PLAYERS = 6;

const Game = new Vuex.Store({
  state: {
    currentPlayer: new Player('HOST'),
    players: [],
    drafting: false,
    actions: new ActionDeck(PLAYERS),
    todo: [],
    doing: [],
    done: [],
    currentWeek: null,
    weeks: new Array(WEEKSINGAME)
      .fill()
      .map((item, index) => new Week(1 + index)),
    currentDay: null,
    gameJournal: [],
    days: new Array(DAYSINWEEK).fill().map((item, index) => new Day(1 + index)),
  },
  mutations: {
    writeToJournal(state, msg) {
      state.gameJournal.push({
        msg,
        week: state.currentWeek,
        day: state.currentDay,
      });
    },
    addPlayer(state, name) {
      const newPlayer = new Player(name);
      state.players.push(newPlayer);
    },
    toggleDrafting(state) {
      state.drafting = !state.drafting;
    },
    passHands(state) {
      state.players.forEach((player, idx, players) => {
        const nextPlayer = getNext(idx, players);
        nextPlayer.tempHand = player.hand;
      });
      state.players = state.players.map((player) => {
        const newPlayer = player;
        newPlayer.hand = newPlayer.tempHand;
        delete newPlayer.tempHand;
        return newPlayer;
      });
    },
    setDrafting(state, payload) {
      state.drafting = payload.drafting;
    },
    drawCardFromPlayer(state, data) {
      const player = state.players[data.playerIdx];
      const cardPlayed = player.playFromHand(data.cardIdx);
      if (state.drafting === true) player.reserveToHand(cardPlayed);

    },
    playCard(state, data) {
      const player = state.players[data.playerIdx];
      player.playFromReserve(data.cardIdx);
      state.gameJournal.push({
        msg: `${data.user} played ${data.cardName}`,
        week: state.currentWeek,
        day: state.currentDay,
      });
    },
    shuffleActions(state) {
      state.actions.reset();
      state.actions.shuffle();
      state.players.forEach((player) => {
        player.resetHand();
        player.addToHand(copyObj(state.actions.draw()));
        player.addToHand(copyObj(state.actions.draw()));
        player.addToHand(copyObj(state.actions.draw()));
        player.addToHand(copyObj(state.actions.draw()));
        player.addToHand(copyObj(state.actions.draw()));
        player.addToHand(copyObj(state.actions.draw()));
      });
    },
    replaceGameState(state, payload) {
      const propsToReassign = [
        'actions',
        'players',
        'todo',
        'doing',
        'done',
        'currentWeek',
        'weeks',
        'gameJournal',
        'days',
        'currentDay',
      ];
      propsToReassign.forEach((prop) => {
        if (payload[prop]) state[prop] = payload[prop];
      });
    },
    addCard(state, card) {
      state.todo.push(card);
    },
    setProductColumn(state, payload) {
      console.log(`Move to ${payload.column}`, payload);
      state[payload.column] = payload.cards;
    },
    setWeek(state, week) {
      const weekNo = parseInt(week, 0);
      state.weeks[weekNo - 1].setCurrent();
      if (state.currentWeek) state.weeks[state.currentWeek - 1].unsetCurrent();
      state.currentWeek = weekNo;
    },
    setDay(state, day) {
      const dayNo = parseInt(day, 0);
      state.days[dayNo - 1].setCurrent();
      if (state.currentDay) state.days[state.currentDay - 1].unsetCurrent();
      state.currentDay = dayNo;
    },
  },
  plugins: [GameStateBroadcaster],
});

/* TODO: Initialization logic should be separated into a
   separate container to support network initialization
*/
Game.commit('setWeek', 1);
Game.commit('setDay', 1);
Game.commit('shuffleActions');

/* Hydrate store with network data on load */
const netState = store.state.userInfo;
const users = netState.allUsers;
users.forEach((user) => {
  Game.commit('addPlayer', user);
});

/* Loosely coupled network subscription */
store.subscribe((mutation, state) => {
  // Initalization logic goes in the top section here
  const mutationType = mutation.type;

  if (mutationType === mutations.ADD_USER) {
    const username = mutation.payload.user;
    Game.commit('addPlayer', username);
    return;
  }

  // From here on, exit if mutation did not come over the wire
  if (mutation.payload.fromNetwork !== true) return;

  if (mutationType === mutations.SET_GAME_STATE) {
    // Main network handling container
    const gameState = JSON.parse(mutation.payload.gameState);
    console.log('Game state mutated over network!', gameState);

    Game.commit('setDrafting', {
      drafting: gameState.drafting,
      localOnly: true,
    });

    // Re-create game classes with networked data
    const actions = new ActionDeck(PLAYERS).reHydrate(gameState.actions);
    delete gameState.actions;

    const players = gameState.players.map((player) => {
      const newPlayer = new Player(player.name);
      newPlayer.reHydrate(player);
      return newPlayer;
    });
    delete gameState.players;

    const days = gameState.days.map((day) => {
      const newDay = new Day(day.dayNum);
      newDay.reHydrate(day);
      return newDay;
    });
    delete gameState.days;

    const weeks = gameState.weeks.map((week) => {
      const newWeek = new Week(week.weekNum);
      newWeek.reHydrate(week);
      return newWeek;
    });
    delete gameState.weeks;
    const replacedGameState = {
      players,
      actions,
      days,
      weeks,
      ...gameState,
      localOnly: true,
    };
    console.info('replaced game state', replacedGameState);
    Game.commit('replaceGameState', replacedGameState);
    return;
  }

  console.log(state);
});

export default Game;

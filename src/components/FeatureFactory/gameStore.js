import Vue from 'vue';
import Vuex from 'vuex';
import Week from './GameClasses/Week';
import Player from './GameClasses/Player';
import ActionDeck from './GameClasses/ActionDeck';
import Day from './GameClasses/Day';

Vue.use(Vuex);

const WEEKSINGAME = 12;
const DAYSINWEEK = 5;

const Game = new Vuex.Store({
  state: {
    currentPlayer: new Player('HOST'),
    actions: new ActionDeck(),
    todo: [],
    doing: [],
    done: [],
    currentWeek: null,
    weeks: new Array(WEEKSINGAME)
      .fill()
      .map((item, index) => new Week(1 + index)),
    currentDay: null,
    days: new Array(DAYSINWEEK).fill().map((item, index) => new Day(1 + index)),
  },
  mutations: {
    addCard(state, card) {
      state.todo.push(card);
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
});

/* TODO: Initialization logic should be separated into a
   separate container to support network initialization
*/
Game.commit('setWeek', 1);
Game.commit('setDay', 1);

export default Game;

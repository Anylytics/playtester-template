import Vue from 'vue';
import Vuex from 'vuex';
import { randomInteger } from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      gameName: null,
      // TODO: Get rid of stub here in favor of game lobby ID generation;
      //       when null, component will not render
      gameId: randomInteger(10000, 99999),
      userName: null,
    },
  },
  mutations: {
    createGame(state, { gameName, userName }) {
      state.userInfo.gameName = gameName;
      state.userInfo.userName = userName;
      // TODO: Add any other init logic here
    },
  },
});

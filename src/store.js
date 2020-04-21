import Vue from 'vue';
import Vuex from 'vuex';
// import { getField, updateField } from 'vuex-map-fields';
// import { randomInteger } from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      gameName: null,
      // TODO: Get rid of stub here in favor of game lobby ID generation;
      //       when null, component will not render
      gameId: null,
      userName: null,
    },
  },
  mutations: {
    createGame(state, { gameName, userName, gameId }) {
      state.userInfo.gameName = gameName;
      state.userInfo.userName = userName;
      state.userInfo.gameId = gameId;
      // TODO: Add any other init logic here
    },
    joinGame(state, gameId) {
      console.log(gameId);
      state.userInfo.gameId = gameId;
    },
  },
});

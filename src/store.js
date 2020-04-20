import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      gameName: null,
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

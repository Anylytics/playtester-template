import Vue from 'vue';
import Vuex from 'vuex';
import Peer from 'peerjs';
// import { getField, updateField } from 'vuex-map-fields';
// import { randomInteger } from './utils';

Vue.use(Vuex);

/* eslint-disable no-param-reassign, no-console */
function relayOverNetwork(state, payload, functionName) {
  // if (typeof payload !== 'object') {
  //   payload = { payload };
  // }
  if (
    payload.fromNetwork === undefined
    && state.userInfo.connections.length > 0
  ) {
    payload.functionName = functionName;
    if (payload.connection === undefined) {
      console.log(
        `sending ${functionName} to ${state.userInfo.connections.length} connections`,
      );
      state.userInfo.connections.forEach((con) => {
        con.send(payload);
      });
    } else {
      console.log(`sending ${functionName} to specific connection`);
      const { connection } = payload;
      delete payload.connection;
      connection.send(payload);
    }
  }
}

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    userInfo: {
      // TODO: rename userInfo to something like "networkingInfo",
      // since it will contain everything pertinent to this networking module
      gameName: null,
      // TODO: Get rid of stub here in favor of game lobby ID generation;
      //       when null, component will not render
      gameId: null,
      userName: null,
      connections: [],
      peerjs: null,
      myId: null,
      allUsers: [],
    },
    socialInfo: {
      chats: [],
    },
  },
  mutations: {
    addConnection(state, connection) {
      state.userInfo.connections.push(connection);
    },
    setGameName(state, payload) {
      relayOverNetwork(state, payload, 'setGameName');
      const { gameName } = payload;
      state.userInfo.gameName = gameName;
    },
    addUser(state, payload) {
      relayOverNetwork(state, payload, 'addUser');
      const { user } = payload;
      console.log(`Adding user ${user}`);
      state.userInfo.allUsers.push(user);
    },
    addMessage(state, payload) {
      relayOverNetwork(state, payload, 'addMessage');
      const { message } = payload;
      state.socialInfo.chats.push(message);
    },
  },
  actions: {
    // initializeNewConnection({ state }, connection) {
    //   // A new user has joined, synchronize state with them
    //   // All implementation specific logic should go here!
    // },
    initNetworking({ state }) {
      const peerjs = new Peer({});
      peerjs.on('open', (id) => {
        console.log(`PeerJs initialized. id: ${id}`);
        state.userInfo.peerjs = peerjs;
        state.userInfo.myId = id;
      });
    },
    async initHost({ state, dispatch, commit }, { gameName, userName }) {
      // return new Promise((resolve) => {

      state.userInfo.userName = userName;
      state.userInfo.gameId = state.userInfo.myId;
      commit('setGameName', { gameName });
      commit('addUser', { user: userName });
      state.userInfo.peerjs.on('connection', async (connection) => {
        connection.on('open', async () => {
          console.log('Host received a connection');
          await dispatch('setupConnection', connection);
          relayOverNetwork(
            state,
            { gameName: state.userInfo.gameName, connection },
            'setGameName',
          );
          state.userInfo.allUsers.forEach((user) => {
            relayOverNetwork(state, { user, connection }, 'addUser');
          });
          // await dispatch('initializeNewConnection', connection);
        });
      });
      console.log(`Initialized host ${state.userInfo.gameId}`);
      // resolve();
      // });
    },
    async joinSession({ state, dispatch, commit }, { gameId, userName }) {
      // return new Promise((resolve) => {
      console.log(`joining ${gameId}`);
      const connection = state.userInfo.peerjs.connect(gameId);
      await connection.on('open', async () => {
        console.log(`Connected to ${gameId}`);
        // At this point, we should be connected to the host
        // state.userInfo.peerjs = peerjs;
        state.userInfo.userName = userName;
        state.userInfo.gameId = gameId;
        commit('addUser', { user: userName });
        await dispatch('setupConnection', connection);
        relayOverNetwork(state, { user: userName, connection }, 'addUser');
      });

      // });
      // });
    },
    setupConnection({ state, commit }, connection) {
      // state.userInfo.connections.push(connection);
      commit('addConnection', connection);
      console.log(`Connection setup ${connection}`);
      // This is the main networking loop
      connection.on('data', (payload) => {
        console.log('recieved ', payload.functionName);
        // forward it on, if we need to
        state.userInfo.connections.forEach((con) => {
          if (con !== connection) {
            console.log('Forwarding network message');
            con.send(payload);
          }
        });
        // Mark that the data came over the network and run the function
        payload.fromNetwork = true;
        commit(payload.functionName, payload);
      });
    },
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import Peer from 'peerjs';
import { networkingPlugin, relayOverNetwork } from './networking';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  plugins: [networkingPlugin],
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
    setGameName(state, { gameName }) {
      state.userInfo.gameName = gameName;
    },
    addUser(state, { user }) {
      console.log(`Adding user ${user}`);
      state.userInfo.allUsers.push(user);
    },
    addMessage(state, { message }) {
      state.socialInfo.chats.push(message);
    },
  },
  actions: {
    // initializeNewConnection({ state }, connection) {
    //   // A new user has joined, synchronize state with them
    //   // All implementation specific logic should go here!
    // },
    initNetworking({ state }) {
      console.log('init networking');
      const peerjs = new Peer({});
      peerjs.on('open', (id) => {
        console.log(`PeerJs initialized. id: ${id}`);
        state.userInfo.peerjs = peerjs;
        state.userInfo.myId = id;
      });
    },
    async initHost({ state, dispatch, commit }, { gameName, userName }) {
      state.userInfo.userName = userName;
      state.userInfo.gameId = state.userInfo.myId;
      commit('setGameName', gameName);
      commit('addUser', { user: userName });
      state.userInfo.peerjs.on('connection', async (connection) => {
        connection.on('open', async () => {
          console.log('Host received a connection');
          await dispatch('setupConnection', connection);
          relayOverNetwork(
            'setGameName',
            { gameName: state.userInfo.gameName },
            connection,
          );
          state.userInfo.allUsers.forEach((user) => {
            relayOverNetwork('addUser', { user }, connection);
          });
          // await dispatch('initializeNewConnection', connection);
        });
      });
      console.log(`Initialized host ${state.userInfo.gameId}`);
    },
    async joinSession({ state, dispatch, commit }, { gameId, userName }) {
      console.log(`joining ${gameId}`);
      const connection = state.userInfo.peerjs.connect(gameId);
      const yas = await connection.on('open', async () => {
        console.log(`Connected to ${gameId}`);
        // At this point, we should be connected to the host
        // state.userInfo.peerjs = peerjs;
        // state.userInfo.userName = userName;
        state.userInfo.gameId = gameId;
        await dispatch('setupConnection', connection);
        commit('addUser', { user: userName });
        // relayOverNetwork('addUser', { user: userName }, connection);
      });
      console.log('end joinSession');
      console.log(typeof yas);
    },
    /* eslint-disable no-underscore-dangle */
    setupConnection({ state, commit }, connection) {
      // state.userInfo.connections.push(connection);
      commit('addConnection', connection);
      console.log('Connection setup');
      // This is the main networking loop
      connection.on('data', (payload) => {
        console.log('recieved ', payload._functionName);
        // forward it on, if we need to
        state.userInfo.connections.forEach((con) => {
          if (con !== connection) {
            console.log('Forwarding network message');
            con.send(payload);
          }
        });
        // Mark that the data came over the network and run the function
        payload._fromNetwork = true;
        commit(payload._functionName, payload);
      });
    },
  },
});

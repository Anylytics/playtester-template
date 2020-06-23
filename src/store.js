import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '@/mutations';
import { Logger, getPeer } from '@/utils';

Vue.use(Vuex);

const networkConsole = new Logger('🌐 NETWORK STATE');

/* eslint-disable no-param-reassign, no-console */
function relayOverNetwork(state, payload, functionName) {
  const isLocal = payload.fromNetwork === undefined;
  const hasConnections = state.userInfo.connections.length > 0;
  if (isLocal && hasConnections) {
    payload.functionName = functionName;
    if (payload.connection === undefined) {
      networkConsole.log(
        `sending ${functionName} to ${state.userInfo.connections.length} connections`,
      );
      state.userInfo.connections.forEach((con) => {
        con.send(payload);
      });
    } else {
      networkConsole.log(`sending ${functionName} to specific connection`);
      const { connection } = payload;
      delete payload.connection;
      connection.send(payload);
    }
  }
}

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    system: {
      initialized: false,
      error: false,
    },
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
    // Will hold gamestate
    gameInfo: {
      // Simple implementation for now, dump game's networkable
      //    state into a string, let consumer be responsible
      //    for parsing & conflict resolution
      blob: '',
    },
  },
  mutations: {
    addConnection(state, connection) {
      state.userInfo.connections.push(connection);
    },
    [mutations.SET_GAME_NAME](state, payload) {
      relayOverNetwork(state, payload, mutations.SET_GAME_NAME);
      const { gameName } = payload;
      state.userInfo.gameName = gameName;
    },
    [mutations.ADD_USER](state, payload) {
      relayOverNetwork(state, payload, mutations.ADD_USER);
      const { user } = payload;
      networkConsole.log(`Adding user ${user}`);
      state.userInfo.allUsers.push(user);
    },
    addMessage(state, payload) {
      relayOverNetwork(state, payload, 'addMessage');
      const { message } = payload;
      state.socialInfo.chats.push(message);
    },
    [mutations.SET_GAME_STATE](state, payload) {
      if (typeof payload.gameState !== 'string') return;
      relayOverNetwork(state, payload, mutations.SET_GAME_STATE);
      state.gameInfo.blob = payload.gameState;
    },
  },
  actions: {
    async initNetworking({ state }) {
      try {
        const { peerjs, id } = await getPeer();
        networkConsole.log(`PeerJs initialized. id: ${id}`);
        state.userInfo.peerjs = peerjs;
        state.userInfo.myId = id;
        state.system.initialized = true;
      } catch (err) {
        // Neither server available
        console.error('No peerjs servers available', err);
        state.system.initialized = false;
        state.system.error = true;
      }
    },
    async initHost({ state, dispatch, commit }, { gameName, userName }) {
      state.userInfo.userName = userName;
      state.userInfo.gameId = state.userInfo.myId;
      commit(mutations.SET_GAME_NAME, { gameName });
      commit(mutations.ADD_USER, { user: userName });
      state.userInfo.peerjs.on('connection', async (connection) => {
        connection.on('open', async () => {
          networkConsole.log('Host received a connection');
          await dispatch('setupConnection', connection);
          relayOverNetwork(
            state,
            { gameName: state.userInfo.gameName, connection },
            mutations.SET_GAME_NAME,
          );
          state.userInfo.allUsers.forEach((user) => {
            relayOverNetwork(state, { user, connection }, mutations.ADD_USER);
          });
        });
      });
      networkConsole.log(`Initialized host ${state.userInfo.gameId}`);
    },
    async joinSession({ state, dispatch, commit }, { gameId, userName }) {
      networkConsole.log(`joining ${gameId}`, state.userInfo.peerjs);
      const connection = state.userInfo.peerjs.connect(gameId);
      await connection.on('open', async () => {
        networkConsole.log(`Connected to ${gameId}`);
        // At this point, we should be connected to the host
        // state.userInfo.peerjs = peerjs;
        state.userInfo.userName = userName;
        state.userInfo.gameId = gameId;
        commit(mutations.ADD_USER, { user: userName });
        await dispatch('setupConnection', connection);
        relayOverNetwork(
          state,
          { user: userName, connection },
          mutations.ADD_USER,
        );
      });
    },
    setupConnection({ state, commit }, connection) {
      commit('addConnection', connection);
      networkConsole.log(`Connection setup ${connection}`);
      // This is the main networking loop
      connection.on('data', (payload) => {
        networkConsole.log('recieved ', payload.functionName);
        // forward it on, if we need to
        state.userInfo.connections.forEach((con) => {
          if (con !== connection) {
            networkConsole.log('Forwarding network message');
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

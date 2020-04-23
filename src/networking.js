/* eslint-disable no-mixed-operators, import/prefer-default-export, no-unused-vars */

const networkedFunctions = ['setGameName', 'addUser', 'addMessage'];
const networkedLookup = {};
networkedFunctions.forEach((fn) => {
  networkedLookup[fn] = null;
});

/* eslint-disable no-param-reassign, no-console, no-underscore-dangle */
export function relayOverNetwork(functionName, payload, connections) {
  if (Array.isArray(connections) === false) {
    connections = [connections];
  }
  if (payload._fromNetwork === undefined && connections.length > 0) {
    payload._functionName = functionName;

    console.log(`sending ${functionName} to ${connections.length} connections`);
    connections.forEach((con) => {
      con.send(payload);
    });
  }
}

export const networkingPlugin = (store) => {
  store.subscribe((mutation, state) => {
    const { type, payload } = mutation;
    if (networkedLookup[type] !== undefined) {
      console.log(`relaying ${type} over network`);
      relayOverNetwork(type, payload, state.userInfo.connections);
    }
  });
};

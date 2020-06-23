import store from '@/store';
import mutations from '@/mutations';

function stringifyGameState(state) {
  return JSON.stringify(state);
}
function broadcastGameState(mutation, state) {
  try {
    const { localOnly } = mutation.payload;
    if (localOnly) return;
  } catch (err) {
    console.warn(
      'All gameState payloads should minimally be sent as an empty object',
    );
  }
  store.commit(mutations.SET_GAME_STATE, {
    gameState: stringifyGameState(state),
  });
}

const GameStateBroadcaster = (gameStore) => {
  gameStore.subscribe(broadcastGameState);
};

export default GameStateBroadcaster;

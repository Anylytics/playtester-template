<template>
  <div class="pad-10">
    <b-notification v-if="!gameId" type="is-warning" role="alert">
      Looks like there was an issue trying to connect to this game, or no game
      ID was provided
    </b-notification>
    <p v-if="!!gameName">Lobby for {{ gameName }}!</p>
    <p v-if="!!userName">Welcome {{ userName }}!</p>
    <GameId />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GameId from '@/components/Social/GameID.vue';

export default {
  name: 'Lobby',
  components: { GameId },
  computed: {
    ...mapState({
      gameName: (s) => s.userInfo.gameName,
      userName: (s) => s.userInfo.userName,
      gameId: (s) => s.userInfo.gameId,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pad-10 {
  padding: 10px;
}
</style>

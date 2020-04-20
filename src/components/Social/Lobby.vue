<template>
  <div class="is-size-8">
    <p v-if="gameName === null">Lobby goes here!</p>
    <p v-else>Lobby for {{ gameName }}!</p>
    <p v-if="userName !== null">Welcome {{ userName }}!</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Lobby',
  computed: {
    ...mapState({
      gameName: (s) => s.userInfo.gameName,
      userName: (s) => s.userInfo.userName,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

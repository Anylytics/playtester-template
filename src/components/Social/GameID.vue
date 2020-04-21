<template>
  <b-button
    v-if="gameId"
    icon-right="content-copy"
    type="is-primary"
    v-on:click="copyToClipboard"
    >Copy Game ID</b-button
  >
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GameId',
  computed: {
    ...mapState({
      gameId: (s) => s.userInfo.gameId,
    }),
  },
  methods: {
    copyToClipboard() {
      const el = document.createElement('textarea');
      el.value = this.gameId;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$buefy.toast.open({
        duration: 5000,
        message: `Game ID ${this.gameId} copied to clipboard -- share it with your friends!`,
        position: 'is-bottom-right',
        type: 'is-success',
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

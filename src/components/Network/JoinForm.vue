<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Join Game</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Game ID">
          <b-input v-model="gameId" placeholder="Enter Game ID here"></b-input>
        </b-field>

        <b-field label="User Name">
          <b-input v-model="userName" :placeholder="placeUserName"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" v-on:click="closeModal()">
          Cancel
        </button>
        <button
          class="button is-primary"
          type="button"
          v-on:click="joinGame()"
          :disabled="gameId === null"
        >
          Join!
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { genRandomUserName } from '@/utils';

export default {
  name: 'JoinForm',
  data() {
    return {
      userName: null,
      placeUserName: genRandomUserName(),
      gameId: null,
    };
  },
  methods: {
    joinGame() {
      this.$store
        .dispatch('joinSession', {
          gameId: this.gameId,
          userName: this.userName || this.placeUserName,
        })
        .then(() => {
          this.$router.push({ path: 'game', query: { gameId: this.gameId } });
          this.$parent.close();
        });
    },
    closeModal() {
      this.$parent.close();
    },
  },
};
</script>

<style scoped></style>

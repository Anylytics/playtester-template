<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Game</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Game Name">
          <b-input v-model="gameName" :placeholder="placeGameName"></b-input>
        </b-field>

        <b-field label="User Name">
          <b-input v-model="userName" :placeholder="placeUserName"></b-input>
        </b-field>

        <b-field label="Game ID">
          <b-progress v-if="gameId === null" show-value>Waiting for Server</b-progress>
          <b-input v-else v-model="gameId" placeholder="Waiting for Game ID" disabled></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" v-on:click="closeModal()">Cancel</button>
        <button
          class="button is-primary"
          type="button"
          v-on:click="createGame()"
          :disabled="gameId === null"
        >
          Greate Game!
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
// import { mapState } from 'vuex';
import Peer from 'peerjs';

export default {
  name: 'CreateForm',
  created() {
    console.log('Here');
    this.$peer = new Peer();
    this.$peer.on('open', (id) => {
      console.log(`Peer Id ${id}`);
      this.gameId = id;
    });
  },
  data() {
    return {
      // TODO: Randomize these names
      placeGameName: 'Trident Spectre',
      placeUserName: 'GuitySpark',
      gameName: null,
      userName: null,
      gameId: null,
    };
  },
  computed: {},
  methods: {
    createGame() {
      if (this.gameName === null) {
        this.gameName = this.placeGameName;
      }
      if (this.userName === null) {
        this.userName = this.placeUserName;
      }
      console.log(`${this.gameName} ${this.userName}`);
      this.$store.commit('createGame', {
        gameName: this.gameName,
        userName: this.userName,
        gameId: this.gameId,
      });
      this.$router.push({ path: 'game', query: { gameid: this.gameId } });
      this.$parent.close();
    },
    closeModal() {
      this.$parent.close();
    },
  },
};
</script>

<style scoped></style>

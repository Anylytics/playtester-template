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
          <b-progress v-if="gameId === null" show-value
            >Waiting for Server</b-progress
          >
          <b-input
            v-else
            v-model="gameId"
            placeholder="Waiting for Game ID"
            disabled
          ></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" v-on:click="closeModal()">
          Cancel
        </button>
        <button
          class="button is-primary"
          type="button"
          v-on:click="createGame()"
          :disabled="gameId === null"
        >
          Create Game!
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { genRandomUserName } from '@/utils';
import { mapState } from 'vuex';

export default {
  name: 'CreateForm',
  created() {
    // this.peerjs = new Peer({});
    // this.peerjs.on('open', (id) => {
    //   console.log(`Peer Id ${id}`);
    //   this.gameId = id;
    // });
  },
  data() {
    return {
      // TODO: Randomize these names
      placeGameName: 'Trident Spectre',
      placeUserName: genRandomUserName(),
      gameName: null,
      userName: null,
      // gameId: null,
    };
  },
  computed: {
    ...mapState({
      gameId: (s) => s.userInfo.myId,
    }),
  },
  methods: {
    createGame() {
      this.$store
        .dispatch('initHost', {
          gameName: this.gameName || this.placeGameName,
          userName: this.userName || this.placeUserName,
        })
        .then(() => {
          this.$router.push({ path: 'game', query: { gameid: this.gameId } });
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

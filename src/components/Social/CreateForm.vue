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
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button">Cancel</button>
        <button class="button is-primary" type="button" v-on:click="createGame()">
          Greate Game!</button>
      </footer>
    </div>
  </form>
</template>

<script>

export default {
  name: 'CreateForm',
  computed: {

  },
  data() {
    return {
      // TODO: Randomize these names
      placeGameName: 'Trident Spectre',
      placeUserName: 'GuitySpark',
      gameName: null,
      userName: null,
    };
  },
  methods: {
    createGame() {
      if (this.gameName === null) {
        this.gameName = this.placeGameName;
      }
      if (this.userName === null) {
        this.userName = this.placeUserName;
      }
      console.log(`${this.gameName} ${this.userName}`);
      this.$store.commit('createGame', { gameName: this.gameName, userName: this.userName });
      this.$parent.close();
    },
  },
};
</script>

<style scoped>
</style>

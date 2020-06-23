<template>
  <b-navbar fixed-top class="shadow" style="background:#ecf0f1">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/home">
        <img src="@/assets/logo.svg" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/home">
        <b>Feature Factory</b>
      </b-navbar-item>
      <b-navbar-item>{{ currentRouteName }}</b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-on:click="createModal()">New</b-navbar-item>
      <b-navbar-item v-on:click="openJoinModal">Join</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex';
import CreateForm from './Network/CreateForm.vue';
import JoinForm from './Network/JoinForm.vue';

export default {
  name: 'Header',
  data() {
    return {
      isComponentModalActive: false,
    };
  },
  computed: {
    ...mapState({
      gameId: (s) => s.userInfo.gameId,
    }),
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    createModal() {
      this.$buefy.modal.open({
        parent: this,
        component: CreateForm,
        hasModalCard: true,
        trapFocus: true,
      });
    },
    openJoinModal() {
      this.$buefy.modal.open({
        parent: this,
        component: JoinForm,
        hasModalCard: true,
        trapFocus: true,
      });
      // this.$buefy.dialog.prompt({
      //   message: 'Please enter the game ID',
      //   inputAttrs: {
      //     placeholder: 'e.g. q6h1ftzqldf00000',
      //     maxlength: 16,
      //   },
      //   trapFocus: true,
      //   onConfirm: (gameId) => {
      //     this.$store.dispatch('joinSession', { gameId, userName: 'Gokul' });
      //     this.$router.push({ path: 'game', query: { gameId } });
      //   },
      // });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>

<template>
  <div id="app">
    <Header />
    <b-loading :is-full-page="true" :active="!initialized"></b-loading>
    <b-notification
      v-if="serverError"
      type="is-danger"
      aria-close-label="Close notification"
      role="alert"
    >Matchmaking server is unavailable! Please try again later</b-notification>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  computed: {
    ...mapState({
      initialized: (s) => s.system.initialized,
      serverError: (s) => s.system.error,
    }),
  },
};
</script>

<style>
@import 'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css';
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.is-full-height {
  height: 100%;
}
</style>

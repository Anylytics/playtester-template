/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Router from 'vue-router';
import App from '@/App.vue';
import Home from '@/pages/Home.vue';
import Game from '@/pages/Game.vue';
import store from '@/store';
import { randomInteger } from './utils';

// Vue.use(VuePeerJS, new Peer({}));
store.dispatch('initNetworking');
Vue.use(Buefy);
Vue.use(Router);
Vue.mixin({
  methods: {
    randomInteger,
  },
});

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/',
      name: 'Game Home',
      component: Home,
    },
    {
      path: '/game',
      name: 'Game Room',
      component: Game,
    },
  ],
  linkActiveClass: 'is-active',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

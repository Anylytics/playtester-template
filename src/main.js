import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Router from 'vue-router';
import App from './App.vue';
import Home from './pages/Home.vue';
import Game from './pages/GameRoom.vue';

Vue.use(Buefy);
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/game',
      component: Game,
    },
  ],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

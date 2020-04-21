<template>
  <div
    type="is-text"
    class="stuck-on bottom-right social-box card"
    v-bind:class="{ inactive: !panelActive }"
  >
    <b-button
      size="is-small"
      icon-left="chevron-double-down"
      class="close-icon"
      v-on:click="panelActive = !panelActive"
    >
    </b-button>
    <b-tabs v-model="activeTab" class="chat is-full-height">
      <b-tab-item label="Chat" class="is-full-height">
        <Chat />
      </b-tab-item>

      <b-tab-item label="Lobby">
        <Lobby />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Chat from './Chat.vue';
import Lobby from './Lobby.vue';

export default {
  name: 'SocialPanel',
  components: { Chat, Lobby },
  data() {
    return {
      activeTab: 1,
      panelActive: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.close-icon {
  position: absolute;
  right: 5px;
  top: 5px;
  border: none;
  transition: 0.4s ease-out;
  transition-delay: 0.3s;
}
.inactive .close-icon {
  transition: 0.4s ease-out;
  transition-delay: 0.3s;
  transform: rotate(180deg);
}
.social-box {
  width: 256px;
  height: 512px;
  transition: 0.4s ease-in-out;
<<<<<<< HEAD
  /* transform: translateY(464px); */
=======
>>>>>>> 3020f170b9e93120f0ceb6576a84e407dc1a74d7
}
.social-box.inactive {
  transform: translateY(464px);
}
.stuck-on.bottom-right {
  position: fixed;
  bottom: 0px;
  right: 50px;
}
.chat > .tab-content {
  height: 100%;
  padding: 0;
}
</style>

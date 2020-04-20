<template>
  <div class="stuck-on bottom-right social-box card">
    <b-tabs>
      <b-tab-item label="Chat">
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.social-box {
  width: 256px;
  height: 512px;
  transition: 0.4s ease-in-out;
  transform: translateY(464px);
}
.social-box:hover {
  transform: translateY(0);
}
.stuck-on.bottom-right {
  position: fixed;
  bottom: 0px;
  right: 50px;
}
</style>

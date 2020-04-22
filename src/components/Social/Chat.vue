<template>
  <div class="chat-body">
    <div class="chat-container" id="chatContent">
      <div
        class="chat-bubble"
        v-for="(chat, index) in chats"
        :key="index"
        v-bind:class="{ pushRight: chat.user === userName }"
      >
        <div class="chat-msg-wrapper">
          <span class="chat-msg">{{ chat.msg }}</span>
        </div>
        <div class="chat-user is-info is-size-7 has-text-grey-light">
          {{ chat.user || 'no username 😒' }}
        </div>
      </div>
    </div>
    <b-field class="chat-input">
      <b-input
        v-model="currentMsg"
        placeholder="Say hello 👋"
        @keyup.native.enter="addMsg"
      >
      </b-input>
    </b-field>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Chat',
  methods: {
    addMsg() {
      this.$store.commit('addMessage', {
        message: {
          user: this.userName,
          // isMe: true,
          msg: this.currentMsg,
        },
      });
      this.currentMsg = '';
      this.$nextTick(() => {
        const container = this.$el.querySelector('#chatContent');
        container.scrollTop = container.scrollHeight;
      });
    },
  },
  computed: {
    ...mapState({
      userName: (s) => s.userInfo.userName,
      chats: (s) => s.socialInfo.chats,
    }),
  },
  data() {
    return {
      currentMsg: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-body {
  height: calc(100% - 40px);
  position: relative;
}
.chat-container {
  height: calc(100% - 57px);
  overflow: auto;
}
.chat-input {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: whitesmoke;
}
.chat-bubble {
  text-align: left;
  padding: 0 10px;
  max-width: 100%;
  overflow: hidden;
  white-space: normal;
  height: auto;
  padding-top: 5px;
  padding-bottom: 5px;
}
.chat-bubble .chat-msg-wrapper {
  background: whitesmoke;
  padding: 4px 8px;
  margin: 2px 0;
  border-radius: 6px;
  display: inline-block;
}
.chat-bubble.pushRight {
  text-align: right;
}
.chat-bubble .chat-user {
  padding: 0 4px;
}
</style>

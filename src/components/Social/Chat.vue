<template>
  <div class="chat-body">
    <div class="chat-container">
      <div
        class="chat-bubble"
        v-for="(chat, index) in chats"
        :key="index"
        v-bind:class="{ pushRight: chat.isMe }"
      >
        <div>
          <b-tag rounded>{{ chat.msg }}</b-tag>
        </div>
        <div class="chat-user is-info is-size-7 has-text-grey-light">
          {{ chat.user }}
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
export default {
  name: 'Chat',
  methods: {
    addMsg() {
      this.chats.push({
        user: 'nabil',
        isMe: true,
        msg: this.currentMsg,
      });
      this.currentMsg = '';
    },
  },
  data() {
    return {
      currentMsg: '',
      chats: [
        {
          user: 'nabil',
          isMe: true,
          msg: 'Yo, iz me ur boi',
        },
        {
          user: 'guiltyspark',
          isMe: false,
          msg: 'sup dawg',
        },
      ],
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
  height: calc(100% - 50px);
  overflow: auto;
}
.chat-input {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
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
.chat-bubble.pushRight {
  text-align: right;
}
.chat-bubble .chat-user {
  padding: 0 8px;
}
</style>

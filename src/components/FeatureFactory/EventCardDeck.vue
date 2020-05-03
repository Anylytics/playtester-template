<template>
  <div>
    <span>EVENTS</span>
    <div class="resource-container">
      <b-button
        type="is-light"
        style="margin-bottom: 8px"
        expanded
        icon-right="refresh"
        v-on:click="resetDeck"
      />
      <div
        class="event-item card is-size-7 animated fadeIn"
        v-for="(event, id) in drawn"
        v-bind:key="id"
      >
        {{ event }}
      </div>
      <div class="event-deck card container" v-on:click="draw">
        <b-icon icon="calendar" size="is-large"> </b-icon>
        <div>Event Deck</div>
      </div>
    </div>
  </div>
</template>
<script>
import Deck from '@/utils/deckGenerator';
import events from '@/utils/eventData';

const EventDeck = new Deck(events);
EventDeck.shuffle();

export default {
  name: 'EventCardDeck',
  methods: {
    draw() {
      const event = EventDeck.draw();
      this.$buefy.dialog.alert({
        title: 'Event Card!',
        message: event,
        confirmText: 'Rock on!',
      });
    },
    resetDeck() {
      console.log('resetting...');
      EventDeck.reset();
    },
  },
  data() {
    return {
      drawn: EventDeck.drawn,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resource-container {
  width: 100%;
  padding: 16px;
  border-top: #bdc3c7 solid 1px;
  white-space: normal;
  overflow-y: auto;
}
.event-deck {
  width: 100%;
  height: 256px;
  background: #2c3e50;
  cursor: pointer;
  border-radius: 6px;
  color: #e67e22;
}
.event-deck > span {
  margin-top: 84px;
}
.event-item {
  padding: 32px;
  margin-bottom: 8px;
  border: solid 6px #e67e22;
  background: #2c3e50;
  color: #e67e22;
  font-weight: 700;
  border-radius: 6px;
}
</style>

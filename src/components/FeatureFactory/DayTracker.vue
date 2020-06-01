<template>
  <div>
    <h3>Day</h3>
    <b-button
      v-for="day in days"
      v-bind:key="day.dayNum"
      v-on:click="setDay(day)"
      v-bind:type="{ 'is-primary': day.isCurrent }"
      >{{ day.dayNum }}</b-button
    >
  </div>
</template>
<script>
import GameStore from './gameStore';

export default {
  name: 'DayTracker',
  computed: {
    days: {
      get() {
        return GameStore.state.days;
      },
    },
  },
  methods: {
    setDay(day) {
      GameStore.commit('setDay', day.dayNum);
    },
  },
};
</script>

<style scoped></style>

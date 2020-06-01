<template>
  <div>
    <h3>WEEK</h3>
    <b-button
      v-for="week in weeks"
      v-bind:key="week.weekNum"
      v-on:click="setWeek(week)"
      v-bind:type="{ 'is-primary': week.isCurrent }"
      >{{ week.weekNum }}</b-button
    >
  </div>
</template>
<script>
import GameStore from './gameStore';

export default {
  name: 'WeekTracker',
  computed: {
    weeks: {
      get() {
        return GameStore.state.weeks;
      },
    },
  },
  methods: {
    setWeek(week) {
      GameStore.commit('setWeek', week.weekNum);
    },
  },
};
</script>

<style scoped>
.week {
  height: 32px;
  display: inline-block;
}
</style>

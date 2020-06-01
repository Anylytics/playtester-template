<template>
  <div>
    <span>{{ panelTitle }}</span>
    <div class="staff-container">
      <div>
        <b-button
          type="is-light"
          expanded
          icon-right="plus"
          v-on:click="addStaff"
        />
      </div>
      <div
        v-for="(staffMember, idx) in staff"
        :key="idx"
        class="token"
        :style="staffMember"
        v-on:click="rotateColor(staffMember, idx)"
      ></div>
    </div>
  </div>
</template>
<script>
import colorTools from '@/utils/colorTools';
import Deck from '@/utils/deckGenerator';

const { ColorUtility } = colorTools;

const StaffDeck = new Deck([
  '#c23616',
  '#44bd32',
  '#0097e6',
  '#fa983a',
  '#8c7ae6',
]);
console.log(StaffDeck);
StaffDeck.shuffle();
console.log(StaffDeck);

export default {
  name: 'ResourceContainer',
  props: ['panelTitle'],
  methods: {
    addStaff() {
      this.staff.push({
        background: ColorUtility.getNextColor(),
      });
    },
    rotateColor(incomingColor, idx) {
      const oldColor = incomingColor.background;
      const newColor = ColorUtility.getNextColor(oldColor);
      if (!newColor) {
        this.staff.splice(idx, 1);
        return;
      }
      this.staff[idx].background = newColor;
    },
  },
  data() {
    return {
      staff: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff-container {
  width: 100%;
  max-height: 240px;
  padding: 16px;
  border-top: #bdc3c7 solid 1px;
  white-space: normal;
  overflow-y: auto;
}
.token {
  border-radius: 50%;
  height: 32px;
  width: 32px;
  display: inline-block;
  vertical-align: top;
  margin: 8px;
  cursor: pointer;
  transition: 0.2s ease-out;
}
.token > span {
  margin-top: 6px;
}
.token:hover {
  transform: translateY(-3px);
  transition: 0.2s ease-out;
  box-shadow: 0 4px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.add-token {
  border: dashed grey 2px;
}
</style>

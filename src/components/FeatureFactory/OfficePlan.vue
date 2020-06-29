<template>
  <div>
    <svg v-bind:id="identifier" width="111.63029mm" height="67.60894mm" />
  </div>
</template>

<script>
import * as d3 from 'd3';
import OfficePlan1 from '@/assets/office_1.svg';
import OfficePlan2 from '@/assets/office_2.svg';
import OfficePlan3 from '@/assets/office_3.svg';
import OfficePlan4 from '@/assets/office_4.svg';
import OfficePlan5 from '@/assets/office_5.svg';
import OfficePlan6 from '@/assets/office_6.svg';
import colorTools from '@/utils/colorTools';

const seats = [...'abcdefghijklmnop'];
const plans = [
  OfficePlan1,
  OfficePlan2,
  OfficePlan3,
  OfficePlan4,
  OfficePlan5,
  OfficePlan6,
];

function rotateColor(incomingColor) {
  const { ColorUtility } = colorTools;
  const newColor = ColorUtility.getNextColor(incomingColor);
  return newColor;
}

function reMount(seatplan) {
  /* eslint-disable-next-line */
  const card = this.card;
  /* eslint-disable-next-line */
  const planidx = this.planidx;
  card.node().children[0].remove();

  d3.xml(plans[planidx]).then((data) => {
    console.log(card, data);
    card.node().append(data.documentElement);
    Object.keys(seatplan).forEach((seat) => {
      const slot = card.select(`#${seat}`);
      if (seatplan[seat]) {
        slot.style('fill-opacity', 1);
        slot.style('fill', seatplan[seat]);
        slot.attr('fill', seatplan[seat]);
      }
    });
  });
}

function onMount() {
  /* eslint-disable-next-line */
  const onChange = this.onChange;
  /* eslint-disable-next-line */
  const plandata = this.plandata;
  /* eslint-disable-next-line */
  const planidx = this.planidx;

  this.card = d3.select(`svg#${this.identifier}`);
  d3.xml(plans[planidx]).then((data) => {
    this.card.node().append(data.documentElement);
    if (!this.card) return;
    seats.forEach((seat) => {
      const slot = this.card.select(`#${seat}`);
      if (plandata[seat]) {
        slot.style('fill-opacity', 1);
        slot.style('fill', plandata[seat]);
        slot.attr('fill', plandata[seat]);
      }
      slot.on('click', () => {
        const currentColor = slot.attr('fill');
        const newColor = rotateColor(currentColor) || colorTools.flatWhite;
        slot.style('fill-opacity', 1);
        slot.style('fill', newColor);
        slot.attr('fill', newColor);
        onChange(seat, newColor);
      });
    });
  });
}

export default {
  name: 'OfficePlan',
  props: ['identifier', 'onChange', 'plandata', 'planidx'],
  mounted: onMount,
  watch: {
    plandata(newVal) {
      reMount.bind(this, newVal)();
    },
  },
};
</script>

<style>
@font-face {
  font-family: 'Routed Gothic Wide';
  src: url('~@/assets/routed-gothic-wide.ttf');
}
svg * {
  user-select: none;
  font-family: 'Routed Gothic Wide', sans-serif;
}
svg {
  margin: 10px;
}
</style>

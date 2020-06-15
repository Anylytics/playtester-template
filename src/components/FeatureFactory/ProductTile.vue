<template>
  <div>
    <svg v-bind:id="identifier" width="81.634796mm" height="53.412571mm" />
  </div>
</template>

<script>
import * as d3 from 'd3';
import ProductTile from '@/assets/product-tile.svg';
import colorTools from '@/utils/colorTools';

function rotateColor(incomingColor) {
  const { ColorUtility } = colorTools;
  const newColor = ColorUtility.getNextColor(incomingColor);
  return newColor;
}

function fillSchematic(card, model) {
  model.schematic_color.forEach((val, idx) => {
    const slot = card.select(`#${colorTools.getIdToName()[idx]}`);
    let color = val;
    let continueToBindClick = true;
    if (val === '#ecf0f1') {
      color = 'white';
      continueToBindClick = false;
    }
    slot
      .attr('selected', '0')
      .style('fill', colorTools.flatWhite)
      .style('fill-opacity', 0.25)
      .style('stroke', color);
    if (!continueToBindClick) return;

    slot.on('click', () => {
      // const opacity = slot.attr('selected') === '0' ? 1 : 0.25;
      // const selected = slot.attr('selected') === '0' ? '1' : '0';
      // slot.style('fill-opacity', opacity);
      // slot.attr('selected', selected);
      const currentColor = slot.attr('fill');
      const newColor = rotateColor(currentColor) || colorTools.flatWhite;
      slot.style('fill-opacity', 1);
      slot.style('fill', newColor);
      slot.attr('fill', newColor);
    });
    console.log(rotateColor(color));
    slot.on('contextmenu', () => false);
  });
}

function onMount() {
  /* eslint-disable-next-line */
  const cardmodel = this.cardmodel;
  this.card = d3.select(`svg#${this.identifier}`);
  // TODO: Make this more efficient, pulling XML on every new card addition
  d3.xml(ProductTile).then((data) => {
    this.card.node().append(data.documentElement);
    const cardTitle = this.card.select('#featureLabel').select('textPath');
    const cardValue = this.card.select('#val').select('tspan');
    const cardFuture = this.card.select('#future').select('tspan');
    const cardFuture2 = this.card.select('#future2').select('tspan');

    cardTitle.text(cardmodel.product);
    cardValue.text(cardmodel.value);
    cardFuture.text(cardmodel.futures[0] || '');
    cardFuture2.text(cardmodel.futures[1] || '');

    fillSchematic(this.card, cardmodel);
  });
}

export default {
  name: 'Industries',
  props: ['identifier', 'cardmodel'],
  mounted: onMount,
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

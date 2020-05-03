<template>
  <div>
    <svg v-bind:id="identifier" width="81.634796mm" height="53.412571mm" />
  </div>
</template>

<script>
import * as d3 from 'd3';
import ProductTile from '@/assets/product-tile.svg';

function onMount() {
  // const cardmodel = this.cardmodel;
  this.card = d3.select(`svg#${this.identifier}`);
  console.log(this.card);
  // TODO: Make this more efficient, pulling XML on every new card addition
  d3.xml(ProductTile).then((data) => {
    this.card.node().append(data.documentElement);
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

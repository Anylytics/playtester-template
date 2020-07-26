<template>
  <div :style="getIndustryStyle(cardmodel.industryColor)" :class="shouldHide ? 'hidden' : null">
    <svg v-bind:id="identifier" width="81.634796mm" height="53.412571mm" />
    <div class="product-meta">
      <h4>
        <b>{{cardmodel.product}}</b>
        <b-button
          class="small-btn"
          size="is-small"
          @click="hide()"
          icon-left="close"
          type="is-danger"
        ></b-button>
      </h4>
      <h4>
        <em>{{cardmodel.industryName}}</em>
      </h4>
    </div>
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
      const currentColor = slot.attr('fill');
      const newColor = rotateColor(currentColor) || colorTools.flatWhite;
      slot.style('fill-opacity', 1);
      slot.style('fill', newColor);
      slot.attr('fill', newColor);
    });
    slot.on('contextmenu', () => false);
  });
}

function isBlank(str) {
  return !/\S/.test(str);
}

function onMount() {
  /* eslint-disable-next-line */
  const cardmodel = this.cardmodel;
  this.card = d3.select(`svg#${this.identifier}`);
  // TODO: Make this more efficient, pulling XML on every new card addition
  console.log('on mount', cardmodel, this.card);
  d3.xml(ProductTile).then((data) => {
    this.card.node().append(data.documentElement);
    console.log('fetched svg', this.card, data.documentElement);
    const cardTitle = this.card.select('#featureLabel').select('textPath');
    cardTitle.text(cardmodel.product);

    const cardValue = this.card.select('#val').select('tspan');
    cardValue.text(cardmodel.value);

    const cardFuture = this.card.select('#future').select('tspan');
    cardFuture.text(cardmodel.futures[0] || '');

    const cardFuture2 = this.card.select('#future2').select('tspan');
    cardFuture2.text(cardmodel.futures[1] || '');

    const cardIndustryColorBanner = this.card.select('#industryBanner');
    cardIndustryColorBanner.style('fill', cardmodel.industryColor);

    const cardIndustryColorFutures = this.card.select('#industryFuture');
    cardIndustryColorFutures.style('fill', cardmodel.industryColor);

    if (isBlank(cardmodel.futures[0]) && isBlank(cardmodel.futures[1])) {
      cardIndustryColorFutures.style('opacity', 0);
    }

    fillSchematic(this.card, cardmodel);
  });
}

export default {
  name: 'Industries',
  props: ['identifier', 'cardmodel'],
  mounted: onMount,
  data() {
    return {
      shouldHide: false,
    };
  },
  methods: {
    getIndustryStyle(backgroundColor) {
      return {
        backgroundColor,
        color: 'white',
        fontWeight: 800,
      };
    },
    hide() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure? 👀',
        onConfirm: this.setHide,
      });
    },
    setHide() {
      this.shouldHide = true;
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
.industryLabel {
  transform: rotate(90deg);
  display: inline-block;
}
.product-meta {
  padding-bottom: 8px;
  display: block;
  font-size: 18px;
  text-shadow: 1px 1px #262d3e;
}
.title {
  font-size: 20px;
}
.subtitle {
  font-size: 12px;
}
.small-btn {
  margin-left: 4px;
}
.hidden {
  display: none;
}
</style>

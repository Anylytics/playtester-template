<template>
  <div class="container">
    <CardsInHand />
  </div>
</template>

<script>
import CardsInHand from '@/components/GamePlay/CardsInHand.vue';

export default {
  name: 'Home',
  components: { CardsInHand },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<template>
  <div>
    <FFGameBoard />
    <SocialPanel />
  </div>
</template>

<script>
import SocialPanel from '@/components/Social/SocialPanel.vue';
import FFGameBoard from '@/components/FeatureFactory/GameBoard.vue';

export default {
  name: 'Game',
  components: {
    SocialPanel,
    FFGameBoard,
  },
};
</script>

<style scoped></style>

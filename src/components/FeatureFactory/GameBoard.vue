<template>
  <div>
    <div class="columns">
      <div class="column">
        <GameController />
      </div>
      <div class="column">
        <PlayerTracker class="card" />
      </div>
    </div>
    <div class="stretch-right">
      <div class="game-panel panel-narrow">
        <div class="card add-margin">
          <ResourceContainer panel-title="BENCH" />
        </div>
        <div class="card add-margin">
          <BankVault />
        </div>
        <ProductDeck />
        <div class="card add-margin">
          <EventDeck />
        </div>
      </div>
      <div class="game-panel panel-wide">
        TODO
        <draggable
          class="drag-container"
          ghost-class="ghost"
          v-model="todo"
          @start="drag = true"
          @end="drag = false"
          group="cards"
        >
          <ProductTile
            ghost-class="ghost"
            v-for="card in todo"
            :identifier="card.id"
            :cardmodel="card"
            :key="card.id"
          />
        </draggable>
      </div>
      <div class="game-panel panel-wide">
        DOING
        <draggable
          class="drag-container"
          ghost-class="ghost"
          v-model="doing"
          @start="drag = true"
          @end="drag = false"
          group="cards"
        >
          <ProductTile
            ghost-class="ghost"
            v-for="card in doing"
            :identifier="card.id"
            :cardmodel="card"
            :key="card.id"
          />
        </draggable>
      </div>
      <div class="game-panel panel-wide">
        SHIPPED
        <draggable
          class="drag-container"
          @start="drag = true"
          @end="drag = false"
          group="cards"
          v-model="done"
        >
          <ProductTile
            v-for="card in done"
            :identifier="card.id"
            :cardmodel="card"
            :key="card.id"
            class
          />
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
// import CardsInHand from './CardsInHand.vue';
import draggable from 'vuedraggable';
import ResourceContainer from './ResourceContainer.vue';
import ProductTile from './ProductTile.vue';
import BankVault from './BankVault.vue';
import EventDeck from './EventCardDeck.vue';
import ProductDeck from './ProductDeck.vue';
import GameStore from './gameStore';
import PlayerTracker from './PlayerTracker.vue';
import GameController from './GameController.vue';

export default {
  name: 'GameBoard',
  components: {
    ResourceContainer,
    ProductTile,
    BankVault,
    draggable,
    EventDeck,
    ProductDeck,
    PlayerTracker,
    GameController,
  },
  computed: {
    todo: {
      get() {
        return GameStore.state.todo;
      },
      set(cards) {
        GameStore.commit('setProductColumn', {
          column: 'todo',
          cards,
        });
      },
    },
    doing: {
      get() {
        return GameStore.state.doing;
      },
      set(cards) {
        GameStore.commit('setProductColumn', {
          column: 'doing',
          cards,
        });
      },
    },
    done: {
      get() {
        return GameStore.state.done;
      },
      set(cards) {
        GameStore.commit('setProductColumn', {
          column: 'done',
          cards,
        });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::-webkit-scrollbar {
  display: none;
}
.game-panel {
  height: 640px;
  background: whitesmoke;
  border-radius: 5px;
  border: solid 1px whitesmoke;
  margin: 12px;
  display: inline-block;
  vertical-align: top;
  overflow-y: auto;
  -moz-box-shadow: inset 0 0 14px grey;
  -webkit-box-shadow: inset 0 0 14px grey;
  box-shadow: inset 0 0 14px grey;
}
.panel-narrow {
  width: 240px;
}
.panel-wide {
  width: 480px;
}
.stretch-right {
  overflow-x: none;
  white-space: nowrap;
}
.stretch-right:hover {
  overflow-x: auto;
  white-space: nowrap;
}
.add-margin {
  margin: 8px;
}
.shrink {
  transform: scale(0.75);
}
.ghost {
  border: dotted 2px grey;
  border-radius: 16px;
  margin: 0 24px;
  opacity: 0.5;
}
.drag-container {
  min-height: 100%;
}
</style>

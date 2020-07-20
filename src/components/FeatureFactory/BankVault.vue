<template>
  <div>
    <span>BANK: {{vault.length}}</span>
    <div class="resource-container">
      <div>
        <b-button type="is-light" icon-left="plus" v-on:click="addCurrency">$</b-button>
        <b-button type="is-light" icon-left="plus" v-on:click="addCurrency(3)">$$$</b-button>
      </div>
      <div
        v-for="(currencyToken, idx) in vault"
        :key="idx"
        class="token currency"
        v-on:click="removeCurrency"
        :style="currencyToken"
      >
        <b-icon icon="currency-usd" size="is-small"></b-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BankVault',
  methods: {
    addCurrency(amt = 1) {
      new Array(amt).fill('').forEach(() => {
        this.vault.push({
          background: '#f1c40f',
        });
      });
    },
    removeCurrency() {
      this.vault.splice(0, 1);
    },
  },
  data() {
    return {
      vault: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resource-container {
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
  margin-top: 8px;
  margin-left: 1px;
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

<template>
  <b-navbar fixed-top class="shadow" style="background:#ecf0f1">
    <template slot="brand">
      <b-navbar-item>
        <img src="@/assets/logo.svg" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item>
        <b>Feature Factory</b>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-on:click="createModal()">New</b-navbar-item>
      <b-navbar-item tag="router-link" to="/join">Join</b-navbar-item>
    </template>
    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <CreateForm></CreateForm>
    </b-modal>
  </b-navbar>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import CreateForm from './Social/CreateForm.vue';

export default {
  name: 'Header',
  components: {
    CreateForm,
  },
  data() {
    return {
      isComponentModalActive: false,
    };
  },
  methods: {
    createModal() {
      this.$buefy.modal.open({
        parent: this,
        component: CreateForm,
        hasModalCard: true,
        trapFocus: true,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>

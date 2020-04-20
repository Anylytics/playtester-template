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
      <b-navbar-item>
        New
      </b-navbar-item>
      <b-navbar-item>
        Join
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>

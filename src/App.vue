<template>
  <app-container />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppContainer from "./components/AppContainer.vue";

export default defineComponent({
  name: "App",
  components: {
    AppContainer,
  },
});
</script>

<style>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  line-height: 26px;
  color: #ffffff;
}
</style>

<template>
  <AppWrapper />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppWrapper from "./components/AppWrapper.vue";

export default defineComponent({
  name: "App",
  components: {
    AppWrapper,
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

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>

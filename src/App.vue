<template>
  <Container />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "./components/Container/Container.vue";

export default defineComponent({
  name: "App",
  components: {
    Container,
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

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

<style lang="scss">
@import "./styles/base/reset.scss";
@import "./styles/base/typography.scss";
</style>

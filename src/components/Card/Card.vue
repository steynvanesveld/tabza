<template>
  <article class="card">
    <slot />
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
});
</script>

<style scoped lang="scss">
@import "../../styles/abstracts/variables.scss";

.card {
  padding: $global-spacing * 2;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.2s padding-left ease-in-out, 0.2s background-color ease-in-out;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
    padding-left: $global-spacing * 3;
  }
}
</style>

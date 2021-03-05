<template>
  <button class="button"><slot /></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
});
</script>

<style scoped lang="scss">
@import "../../styles/abstracts/variables.scss";

.button {
  cursor: pointer;
  display: inline-flex;
  border: 1px solid transparent;
  outline: none;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  padding: $global-spacing * 2;
  background-color: #15883e;
  border-color: #15883e;
  color: #ffffff;

  &:hover {
    background-color: #1db954;
  }
}
</style>

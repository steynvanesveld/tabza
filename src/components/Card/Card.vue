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

<style scoped>
.card {
  padding: 16px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.2s all ease-in-out;
  border-radius: 4px;
}

.card:hover {
  background-color: rgba(0, 0, 0, 0.75);
  padding-left: 24px;
}

.card ::v-slotted(a) {
  color: currentColor;
  text-decoration: none;
}

.card ::v-slotted(a):visited {
  color: #999999;
}
</style>

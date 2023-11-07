<template>
  <nav class="navigation">
    <a
      href="#"
      v-for="rss in rssFeed"
      :key="rss.id"
      @click="click(rss)"
      :class="['item', rss.active ? 'active' : '']"
    >
      <img :src="`./images/${rss.logo}`" :alt="rss.name" class="logo" />
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Rss } from "../../models/rss.model";

export default defineComponent({
  name: "RssNavigation",

  props: {
    rssFeed: {
      type: Array as PropType<Rss[]>,
      required: true,
    },
  },

  methods: {
    click(rss: Rss) {
      this.$emit("navigationItemClick", rss);
    },
  },

  created() {},
});
</script>

<style scoped lang="scss">
@import "../../styles/abstracts/variables.scss";

.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 (-$global-spacing);
  padding: $global-spacing * 2 0;

  .item {
    flex: 1 1 0px;
    padding: 0 $global-spacing;
    text-align: center;
    opacity: 0.5;
    transition: 0.2s opacity ease-in-out;

    &.active {
      opacity: 1;
    }

    .logo {
      width: 100%;
      max-height: 24px;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>

<template>
  <nav class="navigation">
    <a
      href="#"
      v-for="rssSource in rssSources"
      :key="rssSource.id"
      @click="click(rssSource)"
      :class="['item', rssSource.active ? 'active' : '']"
    >
      <img
        :src="`./logos/${rssSource.logo}`"
        :alt="rssSource.title"
        class="logo"
      />
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RssSource } from "../../models/rss-source.model";

export default defineComponent({
  name: "RssNavigation",

  props: {
    rssSources: {
      type: Array as PropType<RssSource[]>,
      required: true,
    },
  },

  methods: {
    click(rssSource: RssSource) {
      this.$emit("navigationItemClick", rssSource);
    },
  },

  created() {},
});
</script>

<style scoped lang="scss">
.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 -8px;
  padding: 16px 0;

  .item {
    flex: 1 1 0px;
    padding: 0 8px;
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
      filter: brightness(0) invert(1);
    }
  }
}
</style>

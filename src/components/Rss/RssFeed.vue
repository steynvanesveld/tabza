<template>
  <section
    class="feed"
    v-for="rss in rssFeed"
    :key="rss.id"
    v-show="rss.active"
  >
    <a
      class="link"
      :href="item.link"
      target="_blank"
      v-for="(item, index) in rss?.items"
      :key="index"
    >
      <Card>
        {{ item.title }}
      </Card>
    </a>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Rss } from "../../models/rss.model";
import Card from "../Card/Card.vue";

export default defineComponent({
  name: "RssFeed",

  components: { Card },

  props: {
    rssFeed: {
      type: Array as PropType<Rss[]>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import "../../styles/abstracts/variables.scss";

.feed {
  display: grid;
  grid-gap: $global-spacing;
  grid-template-rows: repeat(auto-fill, 1fr);
  overflow-y: scroll;
  padding-right: $global-spacing;

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }
}

.link {
  color: currentColor;
  text-decoration: none;

  &:visited {
    color: #999999;
  }
}
</style>

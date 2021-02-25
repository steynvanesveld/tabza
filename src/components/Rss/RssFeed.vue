<template>
  <section
    class="feed"
    v-for="rssSource in rssSources"
    :key="rssSource.id"
    v-show="rssSource.active"
  >
    <Card v-for="(item, index) in rssSource?.feed?.items" :key="index">
      <a :href="item.link" target="_blank">
        {{ item.title }}
      </a>
    </Card>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RssSource } from "../../models/rss-source.model";
import Card from "../Card/Card.vue";

export default defineComponent({
  name: "RssFeed",

  components: { Card },

  props: {
    rssSources: {
      type: Array as PropType<RssSource[]>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.feed {
  display: grid;
  grid-gap: 8px;
  grid-template-rows: repeat(auto-fill, 1fr);
  overflow-y: scroll;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }
}
</style>

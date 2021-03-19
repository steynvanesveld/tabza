<template>
  <section class="rss">
    <RssNavigation
      :rssSources="rssSources"
      @navigationItemClick="activateRssSource($event)"
    />

    <RssFeed :rssSources="rssSources" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import rssSources from "../../assets/json/rss-sources.json";

import RssFeed from "./RssFeed.vue";
import RssNavigation from "./RssNavigation.vue";

import { Rss } from "../../models/rss.model";
import { RssSource } from "../../models/rss-source.model";

export default defineComponent({
  components: { RssNavigation, RssFeed },
  name: "Rss",

  data() {
    return {
      rssSources: rssSources,
      rssCorsProxy:
        "https://wt-c2bde7d7dfc8623f121b0eb5a7102930-0.sandbox.auth0-extend.com/getRss",
    };
  },

  methods: {
    fetchLocalStorage(): void {
      if (localStorage.rssSources) {
        this.rssSources = JSON.parse(localStorage.rssSources);
      }
    },

    fetchRssFeeds(): void {
      this.rssSources.forEach((rssSource: RssSource) => {
        const rssCorsProxy = new URL(this.rssCorsProxy);

        rssCorsProxy.searchParams.append("url", rssSource.url);

        fetch(rssCorsProxy.toString())
          .then((response) => response.json())
          .then((rss: Rss) => {
            rssSource.feed = rss.feed;
            localStorage.rssSources = JSON.stringify(this.rssSources);
          });
      });
    },

    activateRssSource(rssSource: RssSource) {
      if (!rssSource.active) {
        this.rssSources.forEach(
          (rssSource: RssSource) => (rssSource.active = false)
        );

        rssSource.active = true;
      }
    },

    activateRandomRssSource() {
      const randomIndex = Math.floor(Math.random() * this.rssSources.length);
      const randomRssSource = this.rssSources[randomIndex];

      this.activateRssSource(randomRssSource);
    },
  },

  created() {
    this.fetchLocalStorage();
    this.fetchRssFeeds();
    this.activateRandomRssSource();
  },
});
</script>

<style scoped lang="scss">
@import "../../styles/abstracts/variables.scss";

.rss {
  padding: 0 $global-spacing * 2;
  height: 100%;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
}
</style>

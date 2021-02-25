<template>
  <section class="rss">
    <nav class="navigation">
      <a
        href="#"
        v-for="rssSource in rssSources"
        :key="rssSource.id"
        @click="activateRssSource(rssSource)"
        :class="['navigation-item', rssSource.active ? 'active' : '']"
      >
        <img :src="`/logos/${rssSource.logo}`" :alt="rssSource.title" />
      </a>
    </nav>
    <section class="feeds">
      <section
        class="feed"
        v-for="rssSource in rssSources"
        :key="rssSource.id"
        v-show="rssSource.active"
      >
        <a
          v-for="(item, index) in rssSource?.feed?.items"
          :key="index"
          class="feed-item"
          :href="item.link"
          target="_blank"
        >
          {{ item.title }}
        </a>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import rssSources from "../../public/rss-sources.json";
import { RssSource } from "../models/rss-source.model";
import { Rss } from "../models/rss.model";

export default defineComponent({
  name: "AppRss",

  data() {
    return {
      rssSources: rssSources,
      rssCorsProxy:
        "https://wt-c2bde7d7dfc8623f121b0eb5a7102930-0.sandbox.auth0-extend.com/getRss",
    };
  },

  methods: {
    fetchRssFeeds(): void {
      this.rssSources.forEach((rssSource: RssSource) => {
        const rssCorsProxy = new URL(this.rssCorsProxy);

        rssCorsProxy.searchParams.append("url", rssSource.url);

        fetch(rssCorsProxy.toString())
          .then((response) => response.json())
          .then((rss: Rss) => {
            rssSource.feed = rss.feed;
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
    this.fetchRssFeeds();
    this.activateRandomRssSource();
  },
});
</script>

<style scoped>
.rss {
  color: #fff;
  padding: 0 16px;
  height: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
}

.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 -8px;
  padding: 16px 0;
}

.navigation-item {
  flex: 1 1 0px;
  padding: 0 8px;
  text-align: center;
  opacity: 0.5;
  transition: 0.2s opacity ease-in-out;
}

.navigation-item.active {
  opacity: 1;
}

img {
  width: 100%;
  max-height: 24px;
  filter: brightness(0) invert(1);
}

.feeds {
  overflow-y: scroll;
}

.feeds::-webkit-scrollbar {
  width: 4px;
}

.feeds::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
}

.feed {
  display: grid;
  grid-gap: 8px;
  grid-template-rows: repeat(auto-fill, 1fr);
}

.feed-item {
  color: #fff;
  text-decoration: none;
  padding: 8px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.2s background-color ease-in-out;
}

.feed-item:visited {
  background-color: rgba(0, 0, 0, 1);
}

.feed-item:hover {
  background-color: rgba(0, 0, 0, 0.75);
}
</style>

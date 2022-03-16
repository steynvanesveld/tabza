<template>
  <section class="rss">
    <RssNavigation
      :rssFeed="rssFeed"
      @navigationItemClick="activateRssSource($event)"
    />

    <RssFeed :rssFeed="rssFeed" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import rssFeed from "../../assets/json/rss-feed.json";

import RssFeed from "./RssFeed.vue";
import RssNavigation from "./RssNavigation.vue";

import { Rss } from "../../models/rss.model";
import { RssItem } from "../../models/rss-item.model";

export default defineComponent({
  components: { RssNavigation, RssFeed },
  name: "Rss",

  data() {
    return {
      rssFeed: rssFeed,
      rssCorsProxy: "https://cors.bridged.cc/",
    };
  },

  methods: {
    fetchLocalStorage(): void {
      if (localStorage.rssFeed) {
        this.rssFeed = JSON.parse(localStorage.rssFeed);
      }
    },

    fetchRssFeeds(): void {
      this.rssFeed.forEach((rss: Rss) => {
        fetch(`${this.rssCorsProxy}${rss.url}`, {
          headers: {
            "x-cors-grida-api-key": import.meta.env
              .VITE_CORS_BRIDGED_API_KEY as string,
          },
        })
          .then((response) => response.text())
          .then((str) =>
            new window.DOMParser().parseFromString(str, "text/xml")
          )
          .then((data) => {
            rss.items = Array.from(data.querySelectorAll("item")).map(
              (item) => {
                return new RssItem(
                  item.querySelector("link")?.innerHTML ?? "",
                  item
                    .querySelector("title")
                    ?.innerHTML.replace("<![CDATA[", "")
                    .replace("]]>", "") ?? ""
                );
              }
            );

            localStorage.rssFeed = JSON.stringify(this.rssFeed);
          });
      });
    },

    activateRssSource(rss: Rss) {
      if (!rss.active) {
        this.rssFeed.forEach((rss: Rss) => (rss.active = false));

        rss.active = true;
      }
    },

    activateRandomRssSource() {
      const randomIndex = Math.floor(Math.random() * this.rssFeed.length);
      const randomRssSource = this.rssFeed[randomIndex];

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

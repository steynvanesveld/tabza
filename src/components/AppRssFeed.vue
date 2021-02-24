<template>
  <section class="rss">RSS</section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import rss from "../../public/rss.json";
import { Rss } from "../models/rss.model";

export default defineComponent({
  name: "AppRssFeed",

  data() {
    return {
      rss: rss,
    };
  },

  computed: {},

  methods: {
    fetchRssFeeds() {
      rss.forEach((rss: Rss) => {
        fetch(`https://wt-c2bde7d7dfc8623f121b0eb5a7102930-0.sandbox.auth0-extend.com/getRss
?url=${rss.url}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      });
    },
  },

  created() {
    this.fetchRssFeeds();
  },
});
</script>

<style scoped>
.rss {
  color: #fff;
  padding: 16px;
  height: 100%;
}
</style>

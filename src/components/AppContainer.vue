<template>
  <section
    class="container"
    :style="{ 'background-image': 'url(' + getBackgroundImage + ')' }"
  >
    <app-rss-feed />
    <app-clock />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppClock from "./AppClock.vue";
import AppRssFeed from "./AppRssFeed.vue";
import { Apod } from "../models/apod.model";

export default defineComponent({
  components: { AppClock, AppRssFeed },
  name: "AppContainer",

  data() {
    return {
      loaded: false,
      backgroundImage:
        "https://images-assets.nasa.gov/image/PIA15416/PIA15416~medium.jpg",
      backgroundImageWidth: "1920",
      backgroundImageHeight: "1080",
    };
  },

  computed: {
    getBackgroundImage(): URL {
      const resizedImage = new URL("https://images.weserv.nl");

      resizedImage.searchParams.append("url", this.backgroundImage);
      resizedImage.searchParams.append("w", this.backgroundImageWidth);
      resizedImage.searchParams.append("h", this.backgroundImageHeight);

      return resizedImage;
    },
  },

  methods: {
    getApodData() {
      const apodApi = new URL("https://api.nasa.gov/planetary/apod");

      apodApi.searchParams.append(
        "api_key",
        import.meta.env.VITE_APOD_API_KEY as string
      );

      fetch(`${apodApi}`)
        .then((response) => response.json())
        .then((apod: Apod) => {
          if (apod.hdurl) {
            this.backgroundImage = apod.hdurl;
          }
        });
    },
  },

  created() {
    this.getApodData();
  },
});
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: #222;
}
</style>

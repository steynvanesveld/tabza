<template>
  <section
    class="container"
    :style="{ 'background-image': 'url(' + getBackgroundImage + ')' }"
  >
    <Rss />

    <aside class="aside">
      <Clock />
    </aside>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Rss from "./../Rss/Rss.vue";
import Clock from "./../Clock/Clock.vue";
import { Apod } from "../../models/apod.model";

export default defineComponent({
  components: { Clock, Rss },

  name: "Container",

  data() {
    return {
      loaded: false,
      backgroundImage:
        "https://images-assets.nasa.gov/image/PIA15416/PIA15416~medium.jpg",
      backgroundImageWidth: "2560",
      backgroundImageHeight: "1440",
    };
  },

  computed: {
    getBackgroundImage(): URL | undefined {
      if (this.loaded) {
        const resizedImage = new URL("https://images.weserv.nl");

        resizedImage.searchParams.append("url", this.backgroundImage);
        resizedImage.searchParams.append("w", this.backgroundImageWidth);
        resizedImage.searchParams.append("h", this.backgroundImageHeight);

        return resizedImage;
      }
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

          this.loaded = true;
        });
    },
  },

  created() {
    this.getApodData();
  },
});
</script>

<style scoped lang="scss">
@import "../../styles/abstracts/variables.scss";

.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: #222;

  .aside {
    padding: 0 ($global-spacing * 10);
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>

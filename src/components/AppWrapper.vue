<template>
  <section
    class="wrapper"
    :style="{ 'background-image': 'url(' + backgroundImage + ')' }"
  ></section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Apod } from "../models/apod.model";
export default defineComponent({
  name: "AppWrapper",

  data() {
    return {
      imageDefined: false,
      imageCacheUrl: "https://images.weserv.nl/?url=",
      imageCacheParams: "&w=1920&h=1080",
      imageUrl:
        "https://images-assets.nasa.gov/image/PIA15416/PIA15416~medium.jpg",
    };
  },

  computed: {
    backgroundImage(): string {
      if (this.imageDefined) {
        return `${this.imageCacheUrl}${this.imageUrl}${this.imageCacheParams}`;
      }

      return "";
    },
  },

  methods: {
    getApodData() {
      const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=";
      fetch(`${apodUrl}${import.meta.env.VITE_APOD_API_KEY}`)
        .then((response) => response.json())
        .then((apod: Apod) => {
          if (apod.hdurl) {
            this.imageUrl = apod.hdurl;
          }

          this.imageDefined = true;
        });
    },
  },

  created() {
    this.getApodData();
  },
});
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: #222;
}
</style>

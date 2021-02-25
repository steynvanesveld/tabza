<template>
  <time class="time">{{ time }}</time>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Clock",

  data() {
    return {
      time: "",
    };
  },

  methods: {
    getTime(): void {
      const today = new Date();
      const hours = this.makeDoubleDigits(today.getHours());
      const minutes = this.makeDoubleDigits(today.getMinutes());
      const seconds = this.makeDoubleDigits(today.getSeconds());

      this.time = `${hours}:${minutes}:${seconds}`;

      setTimeout(this.getTime, 100);
    },

    makeDoubleDigits(i: number): string {
      let j = i.toString();

      if (i < 10) {
        j = `0${i}`;
      }

      return j;
    },
  },

  created() {
    this.getTime();
  },
});
</script>

<style scoped lang="scss">
.time {
  font-size: 96px;
  line-height: 96px;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>

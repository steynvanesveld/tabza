<template>
  <section class="clock">{{ time }}</section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppClock",

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

      setTimeout(this.getTime, 100);

      this.time = `${hours}:${minutes}`;
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

<style scoped>
.clock {
  color: #ffffff;
}
</style>

<template>
  <aside>
    <time>{{ time }}</time>
  </aside>
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

<style scoped>
aside {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 80px;
}

time {
  font-size: 96px;
  line-height: 96px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>

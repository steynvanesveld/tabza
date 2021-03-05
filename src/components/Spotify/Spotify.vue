<template>
  <section class="spotify">
    <Button @click="authorize" v-if="!authorized">Authorize Spotify</Button>

    <template v-if="authorized && currentlyPlaying">
      <h2>{{ currentlyPlaying.item.name }}</h2>

      <h3>
        <template v-for="(artist, index) in currentlyPlaying.item.artists">
          {{ artist.name }}
          <template
            v-if="
              index !== Object.keys(currentlyPlaying.item.artists).length - 1
            "
          >
            ,
          </template>
        </template>
      </h3>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "../Button/Button.vue";

export default defineComponent({
  components: { Button },
  name: "Spotify",

  data() {
    return {
      authorized: false,
      currentlyPlaying: "",
    };
  },

  methods: {
    authorize(): void {
      const response_type = "code";
      const scope = "user-read-currently-playing";
      const state = "";

      const spotifyApi = new URL("https://accounts.spotify.com/authorize");
      spotifyApi.searchParams.append("response_type", response_type);
      spotifyApi.searchParams.append(
        "client_id",
        import.meta.env.VITE_SPOTIFY_CLIENT_ID as string
      );
      spotifyApi.searchParams.append("scope", scope);
      spotifyApi.searchParams.append(
        "redirect_uri",
        import.meta.env.VITE_SPOTIFY_REDIRECT_URI as string
      );
      spotifyApi.searchParams.append("state", state);

      window.location.href = spotifyApi.toString();
    },

    getCode(): void {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const body = `code=${code}&redirect_uri=${
          import.meta.env.VITE_SPOTIFY_REDIRECT_URI
        }&grant_type=authorization_code`;

        fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                (import.meta.env.VITE_SPOTIFY_CLIENT_ID +
                  ":" +
                  import.meta.env.VITE_SPOTIFY_CLIENT_SECRET) as string
              ),
          },
          body: body,
        })
          .then((response) => response.json())
          .then((data: any) => {
            document.cookie = `access_token=${data.access_token}`;
            window.location.search = "";
          });
      }
    },

    getCookie(name: string): string | undefined {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },

    getCurrentlyPlaying(): void {
      const access_token = this.getCookie("access_token");

      if (access_token) {
        this.authorized = true;
        fetch("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
          .then((response) => response.json())
          .then((data: any) => {
            if (this.currentlyPlaying !== data) {
              this.currentlyPlaying = data;
            }

            setTimeout(this.getCurrentlyPlaying, 1000);
          });
      }
    },
  },

  created() {
    this.getCode();
    this.getCurrentlyPlaying();
  },
});
</script>

<style scoped lang="scss">
@import "../../styles/abstracts/variables.scss";

.spotify {
  font-size: 40px;

  h2 {
    line-height: 1.5em;
    font-weight: 400;
  }

  h3 {
    line-height: 1.17em;
    font-weight: 400;
  }
}
</style>

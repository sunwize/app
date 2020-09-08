<template>
  <div id="app">
    <v-app :class="{ 'mobile': isMobileLayout, 'android': isAndroid, 'ios': isIOS }">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

      <sidebar right v-model="$store.state.sidebarVisible"></sidebar>

      <music-player v-show="currentMusic"></music-player>

      <mobile-menu v-if="isMobileLayout"></mobile-menu>
    </v-app>
  </div>
</template>

<script>
    import MobileMenu from "@/layouts/MobileMenu.vue";
    import { Plugins } from '@capacitor/core';
    import Sidebar from "@/layouts/Sidebar.vue";
    import MusicPlayer from "@/layouts/MusicPlayer.vue";
    const { Device } = Plugins;

    export default {
      name: 'App',
      components: {MusicPlayer, Sidebar, MobileMenu},
      async created() {
        this.platform = (await Device.getInfo()).operatingSystem;
        this.$store.state.isMobileLayout = this.getLayoutWidth() <= 600;
        this.$store.state.isSmallMobileLayout = this.getLayoutWidth() <= 360;

        window.addEventListener(`resize`, async () => {
          this.platform = (await Device.getInfo()).operatingSystem;
          this.$store.state.isMobileLayout = this.getLayoutWidth() <= 600;
          this.$store.state.isSmallMobileLayout = this.getLayoutWidth() <= 360;
        });
      }
    }
</script>

<style lang="scss" scoped>
  html, body {
    height: 100%;
    width: 100%;
    position: relative;
    padding: 0;
    margin: 0;
  }

  #app {
    --apple-blue: #3880FF;
  }
</style>

import Vue from "vue";

Vue.mixin({
    data() {
        return {
            platform: ''
        }
    },
    computed: {
        darkTheme() {
            return this.$vuetify.theme.dark;
        },
        isIOS() {
            return this.platform.toLowerCase() === 'ios';
        },
        isAndroid() {
            return this.platform.toLowerCase() === 'android';
        },
        isMobileLayout() {
            return this.$store.state.isMobileLayout;
        },
        isSmallMobileLayout() {
            return this.$store.state.isSmallMobileLayout;
        },
        currentMusic() {
            return this.$store.state.currentMusic;
        },
        playing() {
            return this.$store.state.playing;
        }
    },
    methods: {
        reach(url) {
            if (this.$route.path !== url)
                this.$router.push(url);
        },
        switchTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        toggleMainSidebar() {
            this.$store.state.sidebarVisible = !this.$store.state.sidebarVisible;
        },
        getLayoutWidth() {
            return window.outerWidth === 0 ? window.innerWidth : window.outerWidth;
        },
        isMobileLayout2() {
            return this.getLayoutWidth() <= 600;
        },
        isSmallMobileLayout2() {
            return this.getLayoutWidth() <= 320;
        },
        playMusic(music) {
            this.$store.commit('playMusic', music);
            this.$forceUpdate();
        },
        pauseMusic() {
            this.$store.commit('pauseMusic');
            this.$forceUpdate();
        },
        resumePlaying() {
            this.$store.commit('resumePlaying');
            this.$forceUpdate();
        },
        currentTime() {
            return this.$store.state.currentTime;
        }
    }
});


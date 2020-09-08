import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        sidebarVisible: false,
        isMobileLayout: false,
        isSmallMobileLayout: false,
        currentMusic: null,
        playing: false,
        currentTime: 0
    },
    getters: {
        isPlaying(state) {
            return state.playing;
        }
    },
    mutations: {
        playMusic(state, music) {
            state.currentMusic = music;
            state.playing = true;
        },
        pauseMusic(state) {
            state.playing = false;
        },
        resumePlaying(state) {
            state.playing = true;
        },
        setCurrentTime(state, time) {
            state.currentTime = time;
        }
    },
    plugins: [vuexLocal.plugin]
});

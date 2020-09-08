<template>
    <div class="music-player">
        <div v-if="currentMusic" class="player">
            <img :src="currentMusic | thumbnail" alt="music-logo">
            <div class="ml-3">
                <div class="name">{{ currentMusic.name }}</div>
                <div class="artist">{{ currentMusic | artist }}</div>
            </div>
            <v-btn v-if="!playing" class="action" :ripple="false" rounded @click="resumePlaying">
                <v-icon>play_arrow</v-icon>
            </v-btn>
            <v-btn v-else class="action" :ripple="false" rounded @click="pauseMusic">
                <v-icon>pause</v-icon>
            </v-btn>
        </div>

        <div id="player" class="d-none"></div>
    </div>
</template>

<script>
    import YouTubePlayer from 'youtube-player';

    export default {
        name: "MusicPlayer",
        data() {
            return {
                player: null,
                subscribe: null,
                interval: null,
                time: null
            }
        },
        async created() {
            await this.$nextTick();

            window.addEventListener('beforeunload', () => {
                clearInterval(this.interval);
                this.$store.commit('setCurrentTime', this.time);
            });

            this.subscribe = this.$store.subscribe((mutation) => {
                if (mutation.type === 'playMusic')
                    this.play();
                else if (mutation.type === 'pauseMusic')
                    this.pause();
                else if (mutation.type === 'resumePlaying')
                    this.resume();
            });
            this.$store.state.playing = false;

            if (this.currentMusic && this.currentMusic.videoId && this.currentTime() > 0) {
                this.player = YouTubePlayer('player', {
                    videoId: this.currentMusic.videoId
                });
                await this.player.seekTo(this.currentTime());
                await this.player.pauseVideo();
            }

            setInterval(async () => {
                if (this.player)
                    this.time = await this.player.getCurrentTime();
            }, 1000);
        },
        methods: {
            async init() {
                if (this.currentMusic && this.currentMusic.videoId) {
                    this.player = YouTubePlayer('player', {
                        videoId: this.currentMusic.videoId
                    });
                }
            },
            async play() {
                this.$store.state.currentTime = 0;
                if (this.player) {
                    await this.player.stopVideo();
                    await this.player.loadVideoById(this.currentMusic.videoId, 0, 'tiny');
                } else {
                    await this.init();
                }
                await this.player.setPlaybackQuality('tiny');
                await this.player.playVideo();
            },
            async resume() {
                if (!this.player)
                    await this.init();
                await this.player.setPlaybackQuality('tiny');
                await this.player.playVideo();
            },
            async pause() {
                if (!this.player)
                    await this.init();
                await this.player.setPlaybackQuality('tiny');
                await this.player.pauseVideo();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .music-player {
        position: fixed;
        left: 0;
        bottom: 57px;
        width: 100%;
        background: #2e2e2e;

        .player {
            display: flex;
            align-items: center;

            img {
                width: 60px;
                height: 60px;
                object-fit: cover;
            }

            .name {
                font-size: 11pt;
            }

            .artist {
                font-size: 9pt;
                font-weight: 300;
                letter-spacing: 0.5px;
            }

            .action {
                margin-left: auto;
                margin-right: 0.5em;
                box-shadow: none;
                background: transparent !important;

                i {
                    font-size: 30px;
                }

                &:hover, &:active, &:focus, &::before {
                    background: transparent !important;
                }
            }
        }
    }
</style>

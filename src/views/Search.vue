<template>
    <main-page no-toolbar>
        <v-autocomplete @keypress.13="searchSongs" v-model="query" :search-input.sync="search" flat solo rounded prepend-icon="search" :loading="searchingRecommendations"
                        hide-no-data hide-details return-object :items="suggestionsComputed" clearable
                        placeholder="Rechercher un son" class="overflow-hidden px-3 my-3" ref="search">

        </v-autocomplete>
        <v-list class="songs">
            <v-text-field v-if="searchingSongs" height="0" class="mt-0 pt-0" color="primary" loading disabled></v-text-field>
            <template v-else>
                <v-list-item v-for="(song, index) in songs" :key="index" class="song" link @click="playMusic(song)">
                    <img :src="song | thumbnail" alt="thumbnail">
                    <div class="ml-3 overflow-hidden">
                        <div class="text-ellipsis name">{{ song.name }}</div>
                        <div class="text-ellipsis artist">{{ song | artist }}</div>
                    </div>
                </v-list-item>
            </template>
        </v-list>
    </main-page>
</template>

<script>
    import Network from '../assets/plugins/Network.js';

    export default {
        name: "Search",
        data() {
            return {
                search: null,
                searchingRecommendations: false,
                suggestions: null,
                songs: [],
                query: null,
                searchingSongs: false
            }
        },
        computed: {
            suggestionsComputed() {
                if (!this.suggestions)
                    return [];
                if (typeof this.suggestions === 'string')
                    return [this.suggestions];
                else
                    return this.suggestions;
            }
        },
        methods: {
            searchSongs() {
                this.searchingSongs = true;
                this.$refs.search.$el.querySelector('input').blur();
                Network.get(`/musics/search/${this.query}`).then(res => {
                    this.songs = res.data;
                }).finally(() => {
                    this.searchingSongs = false;
                });
            }
        },
        watch: {
            search(val) {
                if (this.searchingRecommendations || !val || val.length === 0)
                    return;

                this.searchingRecommendations = true;

                Network.get(`/musics/suggestions/${val}`).then(res => {
                    this.suggestions = res.data;
                }).finally(() => {
                    this.searchingRecommendations = false;
                });
            },
            query() {
                this.searchSongs();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .songs {
        background: rgba(255, 255, 255, 0.05) !important;
        height: calc(100% - 48px);

        .song {
            padding: 0.5em 1em;
            background: transparent !important;

            img {
                min-width: 60px;
                min-height: 60px;
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
        }
    }
</style>

<template>
    <v-bottom-navigation grow app :value="$route.path">
        <v-btn @click="reach('/')" value="/">
            <span class="menu-name">Accueil</span>
            <v-icon class="material-icons-outlined">home</v-icon>
        </v-btn>

        <v-btn @click="reach('/search')" value="/search">
            <span class="menu-name">Rechercher</span>
            <v-icon>search</v-icon>
        </v-btn>

        <v-btn @click="reach('/library')" value="/library">
            <span class="menu-name">Bibliothèque</span>
            <v-icon>playlist_play</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    export default {
        name: "MobileMenu"
    }
</script>

<style lang="scss" scoped>
    .v-btn--active {
        color: var(--apple-blue) !important;
    }

    .menu-name {
        font-size: 9pt;
        font-weight: 300;
    }
</style>

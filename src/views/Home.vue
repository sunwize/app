<template>
    <main-page>
        <v-btn @click.stop="toggleMainSidebar" icon slot="header-right">
            <v-icon class="material-icons-outlined" color="white">settings</v-icon>
        </v-btn>
    </main-page>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

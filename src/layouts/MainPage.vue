<template>
    <div style="display: contents">
        <v-app-bar flat dense app v-if="!noToolbar">
            <slot name="header-left"></slot>

            <v-toolbar-title>{{ title }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <slot name="header-right"></slot>
        </v-app-bar>

        <v-main>
            <slot></slot>
        </v-main>
    </div>
</template>

<script>
    export default {
        name: "MainPage",
        props: {
            title: {
                type: String
            },
            noToolbar: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>

</style>

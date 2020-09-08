<template>
    <v-navigation-drawer :value="value" @input="event => $emit('input', event)" fixed temporary app :right="right" :width="isSmallMobileLayout ?  '100%' : '75%'">
        <template #prepend>
            <div slot="header" class="header">
                <v-btn @click="$emit('input', false)" class="ml-1" icon>
                    <v-icon>navigate_next</v-icon>
                </v-btn>
                <span class="ml-auto mr-3">Préférences</span>
            </div>
        </template>
        <v-list class="py-0">
            <v-list-item two-line>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="man">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Account</v-list-item-title>
                    <v-list-item-subtitle>David Copperfield</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Sidebar",
        props: {
            value: {
                type: Boolean
            },
            right: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        height: 48px;
        display: flex;
        align-items: center;
        background-color: var(--apple-blue);

        i, span {
            color: white !important;
        }
    }
</style>

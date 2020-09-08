import Vue from 'vue';
import Router from 'vue-router';

import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";

Vue.use(Router);

export default new Router({
    mode: `history`,
    routes: [
        {
            path: `/`,
            name: `home`,
            component: Home
        },
        {
            path: `/search`,
            name: `search`,
            component: Search
        }
    ]
});

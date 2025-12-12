// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AuthContainer from "../components/Login/AuthContainer.vue";
import Home from "../components/Home/Home.vue";
import Popular from "../components/popular/Popular.vue";
import Search from "../components/Search/Search.vue";
const routes = [
    {
        path: "/signin",
        name: "signin",
        component: AuthContainer,
    },
    {
        path: "/",
        name: "home",
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: "/popular",
        name: "popular",
        component: Popular,
        meta: { requiresAuth: true },
    },
    {
        path: "/search",
        name: "search",
        component: Search,
        meta: { requiresAuth: true }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (to.meta.requiresAuth && !isLoggedIn) {
        next("/signin");
    } else {
        next();
    }
});

export default router;

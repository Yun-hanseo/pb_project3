// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AuthContainer from "../components/Login/AuthContainer.vue";
import Home from "../components/Home/Home.vue";

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

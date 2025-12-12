// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AuthContainer from "../components/AuthContainer.vue";

const Home = { template: "<div>홈 페이지 (로그인 성공 시 접근 가능)</div>" };

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
        meta: { requiresAuth: true }, // 로그인 필요
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// ------------------------------
// 🔥 Navigation Guard 수정됨
// ------------------------------
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // 로그인 필요한 페이지인데 비로그인 → /signin 이동
    if (to.meta.requiresAuth && !isLoggedIn) {
        next("/signin");
    } else {
        next();
    }
});

export default router;

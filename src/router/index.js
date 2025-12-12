// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AuthContainer from "../components/AuthContainer.vue";
import { useAuth } from "../composables/useAuth.js";

// 임시 홈 컴포넌트 (나중에 HomePage.vue 만들면 교체)
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
        meta: { requiresAuth: true }, // 로그인 필요한 페이지
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 네비게이션 가드 (미들웨어)
router.beforeEach((to, from, next) => {
    const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기

    // 로그인 필요 페이지인데 로그인 안 되어있으면 → /signin 이동
    if (to.meta.requiresAuth && !isLoggedIn.value) {
        next("/signin");
    } else {
        next(); // 통과
    }
});

export default router;

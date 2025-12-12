// src/composables/useAuth.js
import { ref } from "vue";
import axios from "axios";

export function useAuth() {
    const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true");

    // ✔ 이메일 형식 체크
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ✔ TMDB API 키로 인증 테스트 (조건 충족용)
    async function checkTmdbApiKey() {
        try {
            const key = import.meta.env.VITE_TMDB_API_KEY;
            if (!key) return false;

            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${key}`
            );

            return response.status === 200;
        } catch (e) {
            return false;
        }
    }

    // ✔ 회원가입 기능
    async function register({ email, password, passwordCheck, agree }) {
        if (!email || !password || !passwordCheck)
            return { success: false, message: "모든 입력을 완료하세요." };

        if (!isValidEmail(email))
            return { success: false, message: "이메일 형식이 올바르지 않습니다." };

        if (password !== passwordCheck)
            return { success: false, message: "비밀번호가 일치하지 않습니다." };

        if (!agree)
            return { success: false, message: "약관에 동의해야 합니다." };

        // LocalStorage에서 기존 user 목록 가져오기
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // 이미 가입된 이메일인지 체크
        if (users.find((u) => u.email === email)) {
            return { success: false, message: "이미 존재하는 계정입니다." };
        }

        // ✔ TMDB API 요청 (과제 조건 충족용)
        const validKey = await checkTmdbApiKey();
        if (!validKey) {
            return { success: false, message: "TMDB API Key가 올바르지 않습니다." };
        }

        // 저장
        users.push({
            email,
            password,
            createdAt: new Date().toISOString(),
        });

        localStorage.setItem("users", JSON.stringify(users));

        return { success: true, message: "회원가입 성공" };
    }

    // ✔ 로그인 기능
    function login({ email, password, remember }) {
        if (!email || !password)
            return { success: false, message: "아이디와 비밀번호를 입력하세요." };

        if (!isValidEmail(email))
            return { success: false, message: "이메일 형식이 올바르지 않습니다." };

        // users 목록 불러오기
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === email);

        if (!user)
            return { success: false, message: "존재하지 않는 계정입니다." };

        if (user.password !== password)
            return { success: false, message: "비밀번호가 틀렸습니다." };

        // 로그인 성공 처리
        isLoggedIn.value = true;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", email);

        // ✔ Remember Me 처리
        if (remember) {
            localStorage.setItem("rememberEmail", email);
            localStorage.setItem("keepLogin", "true");
        } else {
            localStorage.removeItem("rememberEmail");
            localStorage.removeItem("keepLogin");
        }

        return { success: true, message: "로그인 성공" };
    }

    // ✔ 로그아웃
    function logout() {
        isLoggedIn.value = false;
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
    }

    return {
        isLoggedIn,
        login,
        register,
        logout,
    };
}

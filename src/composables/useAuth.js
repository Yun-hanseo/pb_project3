import { ref } from "vue";

const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true");

// 🔥 TMDB API KEY 검증 함수 (파일 분리 X)
async function validateApiKey(apiKey) {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;

    try {
        const res = await fetch(url);
        return res.status === 200;
    } catch {
        return false;
    }
}

export function useAuth() {

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // 회원가입
    async function register({ email, password, passwordCheck, agree }) {

        if (!email || !password || !passwordCheck)
            return { success: false, message: "모든 값을 입력하세요." };

        if (!isValidEmail(email))
            return { success: false, message: "올바른 이메일 형식이 아닙니다." };

        if (password !== passwordCheck)
            return { success: false, message: "TMDB API Key가 일치하지 않습니다." };

        if (!agree)
            return { success: false, message: "약관 동의가 필요합니다." };

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find((u) => u.email === email)) {
            return { success: false, message: "이미 존재하는 계정입니다." };
        }

        const keyValid = await validateApiKey(password);
        if (!keyValid)
            return { success: false, message: "올바르지 않은 TMDB API Key 입니다." };

        users.push({
            email,
            password,   // = TMDB API KEY
            apiKey: password,
            createdAt: new Date(),
        });

        localStorage.setItem("users", JSON.stringify(users));

        return { success: true, message: "회원가입 성공!" };
    }

    // 로그인
    function login({ email, password, remember }) {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find((u) => u.email === email);

        if (!user) return { success: false, message: "존재하지 않는 계정입니다." };

        if (user.password !== password)
            return { success: false, message: "TMDB API Key가 틀렸습니다." };


        // 로그인 성공
        isLoggedIn.value = true;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));

        if (remember) {
            localStorage.setItem("rememberEmail", email);
            localStorage.setItem("keepLogin", "true");
        } else {
            localStorage.removeItem("keepLogin");
        }

        return { success: true, message: "로그인 성공!" };
    }

    function logout() {
        isLoggedIn.value = false;
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
    }

    return { isLoggedIn, register, login, logout };
}


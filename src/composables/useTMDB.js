// src/composables/useTMDB.js
import axios from "axios";

export function useTMDB() {

    // ------------------------------
    // 로그인한 사용자 읽기
    // ------------------------------
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    const apiKey = currentUser?.apiKey;   // 🔥 바로 이렇게 가져와야 함

    if (!apiKey) {
        console.warn("🚨 TMDB API Key 없음! 로그인 필요.");
    }

    // ------------------------------
    // axios 클라이언트 생성
    // ------------------------------
    const client = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: apiKey,
            language: "ko-KR"
        }
    });

    // ------------------------------
    // 영화 가져오기
    // ------------------------------
    async function getMovies(type = "popular", page = 1) {
        try {
            const res = await client.get(`/movie/${type}`, { params: { page } });
            return res.data.results;
        } catch (err) {
            console.error("TMDB 요청 실패:", err);
            return [];
        }
    }

    return {
        getMovies
    };
}



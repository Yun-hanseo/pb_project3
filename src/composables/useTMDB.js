import axios from "axios";

export function useTMDB() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    const apiKey = currentUser?.apiKey;

    if (!apiKey) {
        console.warn("🚨 TMDB API Key 없음! 로그인 필요.");
    }

    const client = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: apiKey,
            language: "ko-KR"
        }
    });

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



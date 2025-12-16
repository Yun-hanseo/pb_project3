import axios from "axios";

export function useTMDB() {

    const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    if (!token) {
        console.warn("🚨 TMDB Access Token 없음 (.env 확인)");
    }

    const client = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            language: "ko-KR",
        },
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

    async function searchMovies(keyword, page = 1) {
        try {
            const res = await client.get(`/search/movie`, {
                params: {
                    query: keyword,
                    page,
                    include_adult: false
                }
            });
            return res.data.results;
        } catch (err) {
            console.error("TMDB 검색 실패:", err);
            return [];
        }
    }

    async function getMovieDetail(movieId) {
        try {
            const res = await client.get(`/movie/${movieId}`);
            return res.data;
        } catch (err) {
            console.error("TMDB 상세 조회 실패:", err);
            return null;
        }
    }


    return {
        getMovies,
        searchMovies,
        getMovieDetail
    };
}



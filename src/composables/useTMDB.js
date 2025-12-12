// src/composables/useTMDB.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export function useTMDB() {
// 영화 리스트 가져오기: popular, top_rated, now_playing, upcoming 등
    async function fetchMovies(type = "popular", page = 1) {
        try {
            const url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
            const res = await axios.get(url);
            return res.data.results; // 영화 리스트
        } catch (err) {
            console.error(`TMDB fetchMovies(${type}) error:`, err);
            return [];
        }
    }

// 영화 상세 정보 요청
    async function fetchMovieDetail(id) {
        try {
            const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            console.error(`TMDB fetchMovieDetail(${id}) error:`, err);
            return null;
        }
    }

// 장르 리스트 요청
    async function fetchGenres() {
        try {
            const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`;
            const res = await axios.get(url);
            return res.data.genres; // [{id: 28, name:"Action"}, ...]
        } catch (err) {
            console.error("TMDB fetchGenres error:", err);
            return [];
        }
    }

    return {
        fetchMovies,
        fetchMovieDetail,
        fetchGenres,
    };
}
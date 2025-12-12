// src/composables/useTMDB.js
import axios from "axios";

export function useTMDB() {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    const apiKey = user?.apiKey;

    const client = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: { api_key: apiKey, language: "ko-KR" }
    });

    async function getMovies(type = "popular", page = 1) {
        const res = await client.get(`/movie/${type}`, { params: { page } });
        return res.data;
    }

    return {
        getMovies
    };
}


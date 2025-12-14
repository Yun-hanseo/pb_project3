import { ref, computed } from "vue";

const ID_KEY = "likedMovies";
const DATA_KEY = "likedMoviesData";

const wishlistIds = ref(
    JSON.parse(localStorage.getItem(ID_KEY) || "[]")
);

const wishlistMovies = ref(
    JSON.parse(localStorage.getItem(DATA_KEY) || "[]")
);

function syncStorage() {
    localStorage.setItem(ID_KEY, JSON.stringify(wishlistIds.value));
    localStorage.setItem(DATA_KEY, JSON.stringify(wishlistMovies.value));
}

function toggleWishlist(movie) {
    const index = wishlistIds.value.indexOf(movie.id);

    if (index !== -1) {
        // 제거
        wishlistIds.value.splice(index, 1);
        wishlistMovies.value = wishlistMovies.value.filter(
            m => m.id !== movie.id
        );
    } else {
        // 추가
        wishlistIds.value.push(movie.id);
        wishlistMovies.value.push(movie);
    }

    syncStorage();
}

function removeFromWishlist(id) {
    wishlistIds.value = wishlistIds.value.filter(v => v !== id);
    wishlistMovies.value = wishlistMovies.value.filter(m => m.id !== id);
    syncStorage();
}

function isInWishlist(id) {
    return wishlistIds.value.includes(id);
}

export function useWishlist() {
    return {
        wishlistIds,
        wishlistMovies,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist
    };
}

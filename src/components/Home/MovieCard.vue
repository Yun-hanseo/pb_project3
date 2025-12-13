
<template>
  <div
      class="movie-card"
      :class="{ bookmarked: isBookmarked }"
      @click="toggleBookmark"
  >

    <!-- 영화 이미지 -->
    <img
        class="poster"
        :src="imgUrl"
        :alt="movie.title"
    />

    <!-- 영화 정보 -->
    <div class="info">
      <h3 class="title">{{ movie.title }}</h3>
      <p class="overview">{{ shortOverview }}</p>

      <div class="meta">
        <span v-if="movie.vote_average">⭐ {{ movie.vote_average }}</span>
        <span v-if="movie.release_date">{{ movie.release_date }}</span>
      </div>
    </div>

    <!-- 추천 표시 -->
    <div class="bookmark-icon">
      <i v-if="isBookmarked" class="fas fa-heart"></i>
      <i v-else class="far fa-heart"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  movie: Object,
  genres: Array
});

/* =========================
   찜 상태 (Wishlist 연동)
========================= */
const isBookmarked = ref(false);

const ID_KEY = "likedMovies";
const DATA_KEY = "likedMoviesData";

/* 찜 상태 로드 */
function loadBookmarkStatus() {
  const ids = JSON.parse(localStorage.getItem(ID_KEY) || "[]");
  isBookmarked.value = ids.includes(props.movie.id);
}

/* 찜 토글 */
function toggleBookmark() {
  const ids = JSON.parse(localStorage.getItem(ID_KEY) || "[]");
  const data = JSON.parse(localStorage.getItem(DATA_KEY) || "[]");

  if (isBookmarked.value) {
    localStorage.setItem(
        ID_KEY,
        JSON.stringify(ids.filter(id => id !== props.movie.id))
    );
    localStorage.setItem(
        DATA_KEY,
        JSON.stringify(data.filter(m => m.id !== props.movie.id))
    );
    isBookmarked.value = false;
  } else {
    localStorage.setItem(
        ID_KEY,
        JSON.stringify([...ids, props.movie.id])
    );
    localStorage.setItem(
        DATA_KEY,
        JSON.stringify([...data, props.movie])
    );
    isBookmarked.value = true;
  }
}

/* =========================
   기존 코드 (그대로 유지)
========================= */
const imgUrl = computed(() => {
  return props.movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
      : "/no-image.png";
});

const shortOverview = computed(() => {
  if (!props.movie.overview) return "설명 없음";
  return props.movie.overview.length > 70
      ? props.movie.overview.slice(0, 70) + "..."
      : props.movie.overview;
});

onMounted(loadBookmarkStatus);
</script>


<style scoped>
.movie-card {
  position: relative;
  width: 160px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* Hover 시 확대 효과 */
.movie-card:hover {
  transform: scale(1.07);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
}

.poster {
  width: 100%;
  border-radius: 10px;
}

.info {
  margin-top: 8px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.overview {
  font-size: 12px;
  opacity: 0.7;
  height: 40px;
  overflow: hidden;
}

.meta {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  opacity: 0.85;
}

/* 추천(즐겨찾기) 아이콘 */
.bookmark-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 20px;
}

.bookmarked .bookmark-icon i {
  color: red;
}

.bookmarked {
  border: 1px solid red;
  border-radius: 10px;
}
</style>

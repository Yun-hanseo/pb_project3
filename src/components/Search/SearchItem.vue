<!-- src/components/Search/SearchItem.vue -->
<template>
  <div class="search-item">

    <!-- 포스터 -->
    <img
        class="poster"
        :src="posterUrl"
        :alt="movie.title"
    />

    <!-- 제목 -->
    <p class="title">{{ movie.title }}</p>

    <!-- 찜 버튼 -->
    <button class="heart" @click.stop="toggleLike">
      <span v-if="liked">❤️</span>
      <span v-else>🤍</span>
    </button>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const liked = ref(false);
const STORAGE_KEY = "likedMovies";

/* -------------------------
   포스터 URL
------------------------- */
const posterUrl = computed(() => {
  return props.movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`
      : "/no-image.png";
});

/* -------------------------
   찜 상태 로드
------------------------- */
onMounted(() => {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  liked.value = list.includes(props.movie.id);
});

/* -------------------------
   찜 토글
------------------------- */
function toggleLike() {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (liked.value) {
    const next = list.filter(id => id !== props.movie.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    liked.value = false;
  } else {
    list.push(props.movie.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    liked.value = true;
  }
}
</script>

<style scoped>
.search-item {
  position: relative;
  cursor: pointer;
}

/* 포스터 */
.poster {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.25s ease;
}

.search-item:hover .poster {
  transform: scale(1.05);
}

/* 제목 */
.title {
  margin-top: 6px;
  font-size: 14px;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 하트 */
.heart {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>

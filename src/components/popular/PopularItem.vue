<template>
  <div class="simple-card">
    <!-- 포스터 -->
    <img
        class="poster"
        :src="posterUrl"
        :alt="movie.title"
    />

    <!-- 하트 -->
    <button class="heart" @click.stop="toggleLike">
      <span v-if="liked">🤍</span>
      <span v-else>🤍</span>
    </button>

    <!-- 제목 -->
    <p class="title">{{ movie.title }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  movie: Object
});

const liked = ref(false);
const ID_KEY = "likedMovies";
const DATA_KEY = "likedMoviesData";

/* 찜 상태 로드 */
onMounted(() => {
  const ids = JSON.parse(localStorage.getItem(ID_KEY) || "[]");
  liked.value = ids.includes(props.movie.id);
});

const posterUrl = computed(() => {
  return props.movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
      : "/no-image.png";
});

/* 찜 토글 */
function toggleLike() {
  const ids = JSON.parse(localStorage.getItem(ID_KEY) || "[]");
  const data = JSON.parse(localStorage.getItem(DATA_KEY) || "[]");

  if (liked.value) {
    localStorage.setItem(
        ID_KEY,
        JSON.stringify(ids.filter(id => id !== props.movie.id))
    );
    localStorage.setItem(
        DATA_KEY,
        JSON.stringify(data.filter(m => m.id !== props.movie.id))
    );
    liked.value = false;
  } else {
    localStorage.setItem(
        ID_KEY,
        JSON.stringify([...ids, props.movie.id])
    );
    localStorage.setItem(
        DATA_KEY,
        JSON.stringify([...data, props.movie])
    );
    liked.value = true;
  }
}
</script>


<style scoped>
.simple-card {
  position: relative;
  cursor: pointer;
  transition: transform 0.25s ease;
}

.simple-card:hover {
  transform: scale(1.05);
}

/* 포스터 */
.poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 10px;
}

/* 제목 */
.title {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #eee;
}

/* 하트 */
.heart {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>


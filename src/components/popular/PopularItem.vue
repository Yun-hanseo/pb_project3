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

const posterUrl = computed(() => {
  return props.movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
      : "/no-image.png";
});

function toggleLike() {
  liked.value = !liked.value;
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


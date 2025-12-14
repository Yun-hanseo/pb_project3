<template>
  <div class="simple-card">
    <!-- 포스터 -->
    <img
        class="poster"
        :src="posterUrl"
        :alt="movie.title"
    />

    <button
        class="heart-btn"
        :class="{ active: isLiked }"
        @click.stop="toggleLike"
    >
      <span class="heart">{{ isLiked ? "♥" : "♡" }}</span>
    </button>

    <!-- 제목 -->
    <p class="title">{{ movie.title }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWishlist } from "@/composables/useWishlist";

const props = defineProps({
  movie: Object
});

const { toggleWishlist, isInWishlist } = useWishlist();

const isLiked = computed(() =>
    isInWishlist(props.movie.id)
);

function toggleLike() {
  toggleWishlist(props.movie);
}

/* 포스터 URL */
const posterUrl = computed(() => {
  return props.movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
      : "/no-image.png";
});
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

.heart-btn {
  position: absolute;
  top: 8px;
  right: 8px;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 5;
  transition: all 0.2s ease;
}

.heart-btn:hover {
  background: rgba(0, 0, 0, 0.85);
  transform: scale(1.1);
}

.heart {
  font-size: 16px;
  color: #bbb;
  transition: color 0.2s ease, transform 0.2s ease;
}

.heart-btn.active .heart {
  color: #e50914;
  transform: scale(1.15);
}
</style>

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

    <button
        class="heart-btn"
        :class="{ active: isLiked }"
        @click.stop="toggleLike"
    >
      <span class="heart">{{ isLiked ? "♥" : "♡" }}</span>
    </button>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWishlist } from "@/composables/useWishlist";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
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
      ? `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`
      : "/no-image.png";
});
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

/* 하트 문자 */
.heart {
  font-size: 16px;
  color: #bbb;
  transition: color 0.2s ease, transform 0.2s ease;
}

.heart-btn.active .heart {
  color: #e50914;
  transform: scale(1.15);
}

@media (max-width: 425px) {
  .title {
    font-size: 13px;
  }

  .heart-btn {
    width: 28px;
    height: 28px;
  }

  .heart {
    font-size: 14px;
  }
}
.search-item {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 포스터는 비율 고정 */
.poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 10px;
}

/* 제목 영역 높이 고정 */
.title {
  margin-top: 6px;
  font-size: 14px;
  text-align: center;
  line-height: 1.2;

  height: 34px;              /* 🔥 두 줄 기준 고정 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

</style>

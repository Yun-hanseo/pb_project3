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
  width:100%;
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

/* ===============================
   📱 모바일 세로 (Portrait)
   =============================== */
@media (max-width: 425px) and (orientation: portrait) {

  .search-item {
    width: 100%;
  }

  .poster {
    aspect-ratio: 2 / 3;   /* 세로 포스터 고정 */
    border-radius: 10px;
  }

  .title {
    font-size: 13px;
    line-height: 1.2;

    /* 🔥 제목 높이 고정 (카드 흔들림 방지) */
    height: 32px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  .heart-btn {
    width: 28px;
    height: 28px;
    top: 6px;
    right: 6px;
  }

  .heart {
    font-size: 14px;
  }
}

/* ===============================
   📱 모바일 가로 (Landscape)
   =============================== */
@media (max-width: 900px) and (orientation: landscape) {

  .poster {
    aspect-ratio: 2 / 3;   /* 가로여도 비율 유지 */
  }

  .title {
    font-size: 13px;
    height: 30px;
    -webkit-line-clamp: 2;
  }

  .heart-btn {
    width: 26px;
    height: 26px;
    top: 6px;
    right: 6px;
  }

  .heart {
    font-size: 13px;
  }
}

/* ===============================
   📱 모바일 가로 (Landscape)
   =============================== */
@media (max-width: 900px) and (orientation: landscape) {

  .search-item {
    width: 100%;
  }

  /* 🔥 가로에서도 포스터 비율 고정 */
  .poster {
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 10px;
  }

  /* 제목 흔들림 방지 */
  .title {
    font-size: 13px;
    line-height: 1.2;

    height: 30px;              /* 카드 높이 통일 */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  /* 하트 버튼 가로모드용 축소 */
  .heart-btn {
    width: 26px;
    height: 26px;
    top: 6px;
    right: 6px;
  }

  .heart {
    font-size: 13px;
  }
}


</style>

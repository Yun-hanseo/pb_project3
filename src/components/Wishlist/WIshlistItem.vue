<template>
  <div class="wishlist-item">

    <!-- 포스터 -->
    <img
        class="poster"
        :src="posterUrl"
        :alt="movie.title"
    />

    <!-- 찜 해제 버튼 -->
    <button class="remove-btn" @click.stop="remove">
      ✖
    </button>

    <!-- 정보 -->
    <div class="info">
      <p class="title">{{ movie.title }}</p>

      <p class="meta">
        ⭐ {{ movie.vote_average?.toFixed(1) || "N/A" }}
        <span v-if="movie.release_date">
          · {{ movie.release_date.slice(0, 4) }}
        </span>
      </p>
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["removed"]);

const posterUrl = computed(() => {
  return props.movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`
      : "/no-image.png";
});

function remove() {
  emit("removed", props.movie.id);
}
</script>

<style scoped>
.wishlist-item {
  position: relative;
  cursor: pointer;
}

/* 포스터 */
.poster {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.25s ease;
}

.wishlist-item:hover .poster {
  transform: scale(1.05);
}

/* 제거 버튼 */
.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 14px;
  cursor: pointer;
}

/* 정보 */
.info {
  margin-top: 6px;
  text-align: center;
}

.title {
  font-size: 14px;
  font-weight: bold;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  margin-top: 2px;
  font-size: 12px;
  color: #aaa;
}

@media (max-width: 425px) {
  .remove-btn {
    width: 24px;
    height: 24px;
    font-size: 12px;
    top: 6px;
    right: 6px;
  }

  .title {
    font-size: 13px;
  }

  .meta {
    font-size: 11px;
  }
}

</style>

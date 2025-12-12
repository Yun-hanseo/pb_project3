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
const ID_KEY = "likedMovies";
const DATA_KEY = "likedMoviesData";

/* 찜 상태 로드 */
onMounted(() => {
  const ids = JSON.parse(localStorage.getItem(ID_KEY) || "[]");
  liked.value = ids.includes(props.movie.id);
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

<template>
  <div class="movie-section">

    <!-- 섹션 제목 -->
    <h2 class="section-title">{{ title }}</h2>

    <!-- 로딩 화면 -->
    <div v-if="loading" class="loading">
      <p>불러오는 중...</p>
    </div>

    <!-- 영화 리스트 -->
    <div v-else class="movie-list">
      <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieCard from "./MovieCard.vue";
import { useTMDB } from "../../composables/useTMDB.js";

// Props: Home.vue에서 전달됨
const props = defineProps({
  title: String,       // 섹션 제목
  apiType: String      // popular, now_playing, upcoming, top_rated...
});

// 상태 변수
const movies = ref([]);
const loading = ref(true);

const { getMovies } = useTMDB();

// API 호출
async function loadMovies() {
  loading.value = true;
  movies.value = await getMovies(props.apiType);
  loading.value = false;
}

// 최초 실행
onMounted(() => {
  loadMovies();
});
</script>

<style scoped>
.movie-section {
  margin: 30px 0;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 14px;
}

/* 카드들을 가로 배치 */
.movie-list {
  display: flex;
  flex-direction: row;
  gap: 16px;

  overflow-x: auto;     /* 🔥 가로 스크롤 */
  overflow-y: visible;
}

/* 🔴 가로 스크롤바 전체 높이 */
.movie-list::-webkit-scrollbar {
  height: 8px;
}

/* ❌ 스크롤바 배경 제거 */
.movie-list::-webkit-scrollbar-track {
  background: transparent;
}

.movie-list::-webkit-scrollbar-thumb {
  background-color: #e50914; /* 넷플릭스 레드 */
  border-radius: 10px;
}

/* hover 시 살짝 밝게 */
.movie-list::-webkit-scrollbar-thumb:hover {
  background-color: #ff2a2a;
}

/* 로딩 화면 */
.loading {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
}
</style>

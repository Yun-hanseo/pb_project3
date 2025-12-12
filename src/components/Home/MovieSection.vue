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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 14px;
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

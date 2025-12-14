<template>
  <div class="movie-section">

    <h2 class="section-title">{{ title }}</h2>

    <!-- 로딩 화면 -->
    <Loading v-if="loading" />

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
import Loading from "@/components/common/Loading.vue";

const props = defineProps({
  title: String,       // 섹션 제목
  apiType: String      // popular, now_playing, upcoming, top_rated...
});

const movies = ref([]);
const loading = ref(true);

const { getMovies } = useTMDB();

async function loadMovies() {
  loading.value = true;
  movies.value = await getMovies(props.apiType);
  loading.value = false;
}

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

.movie-list {
  display: flex;
  flex-direction: row;
  gap: 16px;

  overflow-x: auto;
  overflow-y: visible;
}

.movie-list::-webkit-scrollbar {
  height: 8px;
}

.movie-list::-webkit-scrollbar-track {
  background: transparent;
}

.movie-list::-webkit-scrollbar-thumb {
  background-color: #e50914; /* 넷플릭스 레드 */
  border-radius: 10px;
}

.movie-list::-webkit-scrollbar-thumb:hover {
  background-color: #ff2a2a;
}

@media (max-width: 480px) {

  .movie-list {
    gap: 12px;
    padding-bottom: 6px;
  }

  .section-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
}


</style>

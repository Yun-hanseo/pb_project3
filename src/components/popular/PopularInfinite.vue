<template>
  <div class="popular-infinite">

    <!-- 영화 그리드 -->
    <div class="movie-grid">
      <PopularItem
          v-for="(movie, idx) in movies"
          :key="movie.id + '-' + idx"
          :movie="movie"
      />
    </div>

    <!-- 로딩 표시 -->
    <div v-if="loading" class="loading">
      불러오는 중...
    </div>

    <!-- Top 버튼 -->
    <PopularTopButton v-if="showTopButton" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTMDB } from "../../composables/useTMDB.js";
import PopularItem from "./PopularItem.vue";
import PopularTopButton from "./PopularTopButton.vue";

const movies = ref([]);
const page = ref(1);
const loading = ref(false);
const showTopButton = ref(false);

const MAX_PAGE = 20; // 🔥 TMDB popular 안전 범위
const { getMovies } = useTMDB();

/* -------------------------
   영화 불러오기
------------------------- */
async function loadMore() {
  if (loading.value) return;
  loading.value = true;

  // 🔁 페이지 루프
  if (page.value > MAX_PAGE) {
    page.value = 1;
  }

  const data = await getMovies("popular", page.value);

  if (Array.isArray(data)) {
    movies.value.push(...data);
  }

  page.value++;
  loading.value = false;
}

/* -------------------------
   스크롤 감지 (window 기준)
------------------------- */
function handleScroll() {
  const scrollEnd =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 300;

  if (scrollEnd) {
    loadMore();
  }

  showTopButton.value = window.scrollY > 400;
}

/* -------------------------
   라이프사이클
------------------------- */
onMounted(() => {
  loadMore();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.popular-infinite {
  width: 100%;
  padding: 20px;
}

/* 🔥 핵심: 그리드 레이아웃 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

/* 로딩 */
.loading {
  text-align: center;
  padding: 20px;
  opacity: 0.7;
}

/* 📱 모바일 대응 */
@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>


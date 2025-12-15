<template>
  <div class="popular-infinite">

    <div class="movie-grid">
      <PopularItem
          v-for="(movie, idx) in movies"
          :key="movie.id + '-' + idx"
          :movie="movie"
      />
    </div>

    <!-- 로딩 화면 -->
    <Loading v-if="loading" />

    <PopularTopButton v-if="showTopButton" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTMDB } from "../../composables/useTMDB.js";
import PopularItem from "./PopularItem.vue";
import PopularTopButton from "./PopularTopButton.vue";
import Loading from "@/components/common/Loading.vue";

const movies = ref([]);
const page = ref(1);
const loading = ref(false);
const showTopButton = ref(false);

const MAX_PAGE = 20;
const { getMovies } = useTMDB();

async function loadMore() {
  if (loading.value) return;
  loading.value = true;

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

function handleScroll() {
  const scrollEnd =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 300;

  if (scrollEnd) {
    loadMore();
  }

  showTopButton.value = window.scrollY > 400;
}

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
  padding: 20px 60px 20px 0px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  max-width: calc(100vw - 40px);
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 20px;
  opacity: 0.7;
}

/* ===============================
   📱 모바일 세로 (Portrait)
   =============================== */
@media (max-width: 480px) and (orientation: portrait) {

  .popular-infinite {
    padding: 12px;
  }

  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    max-width: 100%;
    margin-right:60px;
  }
}

/* ===============================
   📱 모바일 가로 (Landscape)
   =============================== */
@media (max-width: 900px) and (orientation: landscape) {

  .popular-infinite {
    padding: 14px 0px;
  }

  /* 🔥 가로에서는 4열이 가장 안정적 */
  .movie-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    max-width: 100%;
    margin-right:50px;
  }
}

</style>


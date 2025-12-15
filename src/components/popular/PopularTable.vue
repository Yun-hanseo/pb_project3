<template>
  <div class="popular-table">

    <!-- 로딩 화면 -->
    <Loading v-if="loading" />

    <!-- 영화 테이블 -->
    <div class="table-grid">
      <PopularItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          table
      />
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
          @click="prevPage"
          :disabled="page === 1"
      >
        이전
      </button>

      <span class="page-info">
        {{ page }} / {{ totalPages }}
      </span>

      <button
          @click="nextPage"
          :disabled="page === totalPages"
      >
        다음
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import PopularItem from "./PopularItem.vue";
import { useTMDB } from "../../composables/useTMDB.js";
import Loading from "@/components/common/Loading.vue";

const page = ref(1);
const totalPages = 30;
const movies = ref([]);
const { getMovies } = useTMDB();

async function loadMovies() {
  movies.value = await getMovies("popular", page.value);
}


/* 페이지 변경 시 자동 스크롤 맨 위 */
watch(page, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function nextPage() {
  if (page.value < totalPages) {
    page.value++;
    loadMovies();
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--;
    loadMovies();
  }
}

onMounted(() => {
  loadMovies();
});
</script>


<style scoped>
.popular-table {
  padding: 20px 40px 20px 20px;
}

/* 테이블 느낌의 그리드 */
.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
}

/* Pagination */
.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color:white;
}

button {
  padding: 6px 14px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-weight: bold;
}

/* ===============================
   📱 모바일 세로 (Portrait)
   =============================== */
@media (max-width: 480px) and (orientation: portrait) {

  .popular-table {
    padding: 12px;
  }

  /* 🔥 세로에서는 2열 고정 */
  .table-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin-right:50px;
  }

  .pagination {
    margin-top: 20px;
    gap: 10px;
  }

  .pagination button {
    padding: 6px 10px;
    font-size: 13px;
  }

  .page-info {
    font-size: 13px;
  }
}

/* ===============================
   📱 모바일 가로 (Landscape)
   =============================== */
@media (max-width: 900px) and (orientation: landscape) {

  .popular-table {
    padding: 14px 20px;
  }

  /* 🔥 가로에서는 4열이 가장 안정적 */
  .table-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-right:50px;
  }

  .pagination {
    margin-top: 22px;
  }

  .pagination button {
    font-size: 13px;
  }
}

</style>

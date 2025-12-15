<template>
  <div class="search-table">

    <!-- 영화 테이블 -->
    <div class="table-grid">
      <SearchItem
          v-for="movie in pagedMovies"
          :key="movie.id"
          :movie="movie"
      />
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">
        이전
      </button>

      <span class="page-info">
        {{ page }} / {{ totalPages }}
      </span>

      <button @click="nextPage" :disabled="page === totalPages">
        다음
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import SearchItem from "./SearchItem.vue";

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const page = ref(1);
const perPage = 20;

/* 총 페이지 수 (과제 조건 충족) */
const totalPages = computed(() =>
    Math.max(1, Math.ceil(props.movies.length / perPage))
);

/* 현재 페이지 영화 */
const pagedMovies = computed(() => {
  const start = (page.value - 1) * perPage;
  return props.movies.slice(start, start + perPage);
});

/* 페이지 변경 시 스크롤 맨 위 */
watch(page, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* 필터 변경 시 페이지 1로 초기화 */
watch(
    () => props.movies,
    () => {
      page.value = 1;
    }
);

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++;
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--;
  }
}
</script>

<style scoped>
.search-table {
  padding: 20px;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
  color:white;
}

.pagination {
  margin: 30px 0 40px;
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
@media (max-width: 425px) and (orientation: portrait) {

  .search-table {
    padding: 12px;
  }

  /* 🔥 핵심: 2열 고정 */
  .table-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .pagination {
    margin: 20px 0 30px;
    gap: 8px;
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

  .search-table {
    padding: 14px;
  }

  /* 가로에서는 4열이 제일 안정적 */
  .table-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .pagination {
    margin: 18px 0 24px;
  }
}

</style>


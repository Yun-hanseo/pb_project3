<template>
  <div class="search-page">

    <!-- 필터 영역 -->
    <SearchFilter
        :filters="filters"
        @change="applyFilter"
        @reset="resetFilter"
    />

    <SearchTable :movies="filteredMovies" />


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTMDB } from "../../composables/useTMDB.js";

import SearchFilter from "./SearchFilter.vue";
import SearchTable from "./SearchTable.vue";

const movies = ref([]);
const rawMovies = ref([]);
const filters = ref({
  genre: "",
  rating: 0,
  sort: "popularity.desc",
});

const { getMovies } = useTMDB();
onMounted(async () => {
  const collected = [];
  const idSet = new Set();

  for (let page = 1; page <= 50; page++) {
    const res = await getMovies("popular", page);

    res.forEach(movie => {
      if (!idSet.has(movie.id)) {
        idSet.add(movie.id);
        collected.push(movie);
      }
    });
  }

  rawMovies.value = collected;
});

const filteredMovies = computed(() => {
  let list = [...rawMovies.value];

  // 장르 필터
  if (filters.value.genre) {
    list = list.filter(movie =>
        movie.genre_ids?.includes(Number(filters.value.genre))
    );
  }

  // 평점 필터
  if (filters.value.rating > 0) {
    list = list.filter(
        m => m.vote_average >= filters.value.rating
    );
  }

  // 정렬
  if (filters.value.sort === "rating") {
    list.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (filters.value.sort === "popular") {
    list.sort((a, b) => b.popularity - a.popularity);
  }

  if (filters.value.sort === "latest") {
    list.sort(
        (a, b) =>
            new Date(b.release_date) - new Date(a.release_date)
    );
  }

  if (filters.value.sort === "hidden") {
    list.sort(
        (a, b) =>
            b.vote_average / (b.popularity + 1) -
            a.vote_average / (a.popularity + 1)
    );
  }

  if (filters.value.sort === "latest_popular") {
    list.sort((a, b) => {
      const dateScore =
          new Date(b.release_date) - new Date(a.release_date);
      const popularityScore = b.popularity - a.popularity;
      return dateScore + popularityScore;
    });
  }


  return list;
});

function applyFilter(newFilters) {
  filters.value = { ...newFilters };
}

function resetFilter() {
  filters.value = {
    genre: "",
    rating: 0,
    sort: "popularity.desc",
  };
}
</script>

<style scoped>
.search-page {
  padding: 20px;
}
</style>

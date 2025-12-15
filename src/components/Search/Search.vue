<template>
  <div class="search-page">
    <!-- 필터 영역 -->
    <SearchFilter
        :filters="filters"
        @change="applyFilter"
        @reset="resetFilter"
    />
    <SearchInput @search="handleSearch" />

    <Loading v-if="loading" />

    <SearchTable v-else :movies="tableMovies" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTMDB } from "../../composables/useTMDB.js";
import Loading from "@/components/common/Loading.vue";

import SearchFilter from "./SearchFilter.vue";
import SearchTable from "./SearchTable.vue";

import SearchInput from "./SearchInput.vue";
const { searchMovies } = useTMDB();

const searchedMovies = ref([]);
const searching = ref(false);

const rawMovies = ref([]);
const loading = ref(true);

const filters = ref({
  genre: "",
  rating: 0,
  sort: "popularity.desc",
});

const { getMovies } = useTMDB();
onMounted(async () => {
  loading.value = true;

  try {
    const collected = [];
    const idSet = new Set();

    for (let page = 1; page <= 200; page++) {
      const res = await getMovies("popular", page);

      res.forEach(movie => {
        if (!idSet.has(movie.id)) {
          idSet.add(movie.id);
          collected.push(movie);
        }
      });
    }

    rawMovies.value = collected;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const filteredMovies = computed(() => {
  let base = searching.value
      ? searchedMovies.value
      : rawMovies.value;

  let list = [...base];

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
  searching.value = false
  filters.value = {
    genre: "",
    rating: 0,
    sort: "popular",
  };
}

async function handleSearch(keyword) {
  loading.value = true;
  searching.value = true;

  try {
    const normalizedKeyword = keyword.replace(/\s+/g, "").toLowerCase();

    const results = await searchMovies(keyword);

    searchedMovies.value = results.filter(movie => {
      const title = (movie.title || "").replace(/\s+/g, "").toLowerCase();
      return title.includes(normalizedKeyword);
    });

  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

const tableMovies = computed(() => {
  if (searching.value) {
    return searchedMovies.value;
  }
  return filteredMovies.value;
});

function normalizedKeyword(text) {
  return text.replace(/\s+/g, "").toLowerCase();
}

</script>


<style scoped>
.search-page {
  padding: 20px;
}
</style>

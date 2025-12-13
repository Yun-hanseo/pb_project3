<template>
  <div class="wishlist-page">

    <!-- 페이지 제목 -->
    <h1 class="title">내가 찜한 리스트</h1>

    <!-- ================= 찜 리스트 ================= -->
    <section class="list-section">
      <div v-if="pagedMovies.length" class="table-grid">
        <WishlistItem
            v-for="movie in pagedMovies"
            :key="movie.id"
            :movie="movie"
            @removed="removeMovie"
        />
      </div>

      <p v-else class="empty">
        아직 찜한 영화가 없습니다.
      </p>
    </section>

    <!-- ================= Pagination ================= -->
    <div v-if="totalPages > 1" class="pagination">
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
import WishlistItem from "./WishlistItem.vue";
import { useWishlist } from "@/composables/useWishlist";

/* ======================
   🔥 공통 Wishlist 상태
====================== */
const { wishlistMovies, removeFromWishlist } = useWishlist();

/* ======================
   Pagination
====================== */
const page = ref(1);
const perPage = 20;

const totalPages = computed(() =>
    Math.max(1, Math.ceil(wishlistMovies.value.length / perPage))
);

const pagedMovies = computed(() => {
  const start = (page.value - 1) * perPage;
  return wishlistMovies.value.slice(start, start + perPage);
});

function nextPage() {
  if (page.value < totalPages.value) page.value++;
}

function prevPage() {
  if (page.value > 1) page.value--;
}

/* ======================
   ❌ 찜 해제 (핵심)
====================== */
function removeMovie(id) {
  removeFromWishlist(id);
}

/* 페이지 변경 시 스크롤 상단 */
watch(page, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<style scoped>
.wishlist-page {
  padding: 20px;
  color:white;
}

.title {
  margin-bottom: 30px;
  color:white;
}

/* 테이블 */
.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.empty {
  margin-top: 40px;
  text-align: center;
  color: #aaa;
}

/* 페이지네이션 */
.pagination {
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
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
</style>

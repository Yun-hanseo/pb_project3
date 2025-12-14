<template>
  <div class="poster-card">

    <div class="poster-wrapper">
      <img :src="imgUrl" class="poster-img" />

      <button
          class="wish-btn"
          :class="{ active: isBookmarked }"
          @click.stop="toggleBookmark"
      >
        <span class="heart">{{ isBookmarked ? "♥" : "♡" }}</span>
      </button>
    </div>

    <p class="poster-title">{{ movie.title }}</p>

    <div class="poster-info">
      <span class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</span>
      <span class="release">{{ movie.release_date }}</span>
    </div>

    <button class="summary-btn" @click="openModal">
      줄거리 보기
    </button>

    <div v-if="showModal" class="inner-popup">
      <button class="close-btn" @click="closeModal">✕</button>

      <h3 class="popup-title">{{ movie.title }}</h3>
      <p class="popup-overview">{{ movie.overview }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useWishlist } from "@/composables/useWishlist";

const props = defineProps({
  movie: Object
});

const imgUrl = computed(() =>
    props.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
        : "https://via.placeholder.com/300x450"
);

const { toggleWishlist, isInWishlist } = useWishlist();

const isBookmarked = computed(() =>
    isInWishlist(props.movie.id)
);

function toggleBookmark() {
  toggleWishlist(props.movie);
}

const showModal = ref(false);
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);
</script>

<style scoped>
.poster-card {
  width: 230px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  border-radius: 14px;
  position: relative;
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.poster-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.poster-img:hover {
  transform: scale(1.05);
}

.poster-title {
  font-size: 15px;
  font-weight: 600;
  color: white;
  margin-top: 4px;
}

.poster-info {
  display: flex;
  gap: 10px;
  font-size: 13px;
}

.rating {
  color: #ffb300;
}

.release {
  color: #aaa;
}

.wish-btn {
  position: absolute;
  top: 10px;
  right: 10px;

  width: 36px;
  height: 36px;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 5;
  transition: all 0.2s ease;
}

.wish-btn:hover {
  background: rgba(0, 0, 0, 0.85);
  transform: scale(1.1);
}

.heart {
  font-size: 18px;
  color: #bbb;
  transition: color 0.2s ease, transform 0.2s ease;
}

.wish-btn.active .heart {
  color: #e50914;
  transform: scale(1.15);
}

.summary-btn {
  margin-top: 4px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: white;
  color: black;
  font-weight: 600;
  cursor: pointer;
}

.inner-popup {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(6px);
  border-radius: 14px;
  padding: 18px;
  color: white;
  z-index: 20;

  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: fadeIn 0.2s ease;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

.popup-title {
  margin-top: 20px;
  font-size: 17px;
  font-weight: 700;
}

.popup-overview {
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 480px) {

  .poster-card {
    width: 40vw;
    padding: 8px;
  }

  .poster-title {
    font-size: 14px;
  }

  .poster-info {
    font-size: 12px;
  }

  .summary-btn {
    height: 30px;
    font-size: 13px;
  }
}

</style>


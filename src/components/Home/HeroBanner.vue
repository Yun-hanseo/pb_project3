<template>
  <section
      class="hero"
      :style="bgStyle"
  >
    <div class="overlay"></div>

    <div class="content">
      <h1 class="title">{{ movie.title }}</h1>
      <p class="overview">
        {{ movie.overview }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTMDB } from "@/composables/useTMDB";

const { getMovies } = useTMDB();
const movie = ref({});

onMounted(async () => {
  const list = await getMovies("popular");
  movie.value = list[Math.floor(Math.random() * list.length)];
});

const bgStyle = computed(() => ({
  backgroundImage: movie.value.backdrop_path
      ? `url(https://image.tmdb.org/t/p/original${movie.value.backdrop_path})`
      : "none"
}));
</script>

<style>
.hero {
  position: relative;
  height: 80vh;

  margin-left: calc(50% - 50vw);
  background-size: cover;
  background-position: center;
  color: white;
}

.hero::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 480px; /* 충분히 길게 */

  background: linear-gradient(
      to bottom,
      rgba(26, 26, 29, 0) 0%,
      rgba(26, 26, 29, 0.25) 25%,
      rgba(26, 26, 29, 0.55) 50%,
      rgba(26, 26, 29, 0.85) 75%,
      #1a1a1d 100%
  );

  pointer-events: none;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      to right,
      rgba(0,0,0,0.85),
      rgba(0,0,0,0.2)
  );
}

.content {
  position: relative;
  z-index: 2;
  max-width: 500px;
  padding: 120px 60px;
}

.title {
  font-size: 48px;
  font-weight: 800;
}

.overview {
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.4;
  opacity: 0.9;
}

@media (max-width: 480px) {
  .hero {
    height: 62vh;        /* 🔥 핵심 */
    min-height: 260px;
  }

  .content {
    padding: 250px 20px 40px;
  }

  .title {
    font-size: 22px;
  }

  .overview {
    font-size: 13px;
    line-height: 1.4;

    display: -webkit-box;
    -webkit-line-clamp: 2;   /* 🔥 2줄 제한 */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .actions button {
    height: 34px;
    font-size: 13px;
  }
}

/* ===============================
   📱 모바일 가로 (Landscape)
   =============================== */
@media (orientation: landscape) and (max-height: 500px) {
  .hero {
    height: 90vh;
  }

  .overview {
    display: none; /* 가로모드에선 설명 제거 */
  }
}
</style>
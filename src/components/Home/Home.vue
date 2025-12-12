<template>
  <div class="home-container">

    <!-- 나중에 Header 들어갈 자리 -->
    <!-- <Header /> -->

    <!-- 메인 섹션 -->
    <MovieSection title="🔥 인기 영화" apiType="popular" />
    <MovieSection title="🎬 현재 상영작" apiType="now_playing" />
    <MovieSection title="⭐ 평점 높은 영화" apiType="top_rated" />
    <MovieSection title="📅 개봉 예정 영화" apiType="upcoming" />

  </div>
</template>

<script setup>
import MovieSection from "./MovieSection.vue";
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;         /* 가운데 정렬 */
  padding: 20px;
}
</style>

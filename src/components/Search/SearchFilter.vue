<!-- src/components/Search/SearchFilter.vue -->
<template>
  <div class="filter-box">

    <!-- 정렬 -->
    <select v-model="local.sort" @change="emitChange">
      <option value="popular">인기순</option>
      <option value="rating">평점순</option>
      <option value="latest">개봉 최신순</option>
    </select>

    <!-- 장르 -->
    <select v-model="local.genre" @change="emitChange">
      <option value="">전체 장르</option>
      <option value="28">액션</option>
      <option value="35">코미디</option>
      <option value="18">드라마</option>
      <option value="878">SF</option>
      <option value="16">애니메이션</option>
    </select>

    <!-- 평점 -->
    <select v-model.number="local.rating" @change="emitChange">
      <option :value="0">전체 평점</option>
      <option :value="7">7점 이상</option>
      <option :value="8">8점 이상</option>
      <option :value="9">9점 이상</option>
    </select>

  </div>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["change"]);

const local = reactive({
  sort: "popular",
  genre: "",
  rating: 0,
});

function emitChange() {
  emit("change", { ...local });
}
</script>

<style scoped>
.filter-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

select {
  padding: 6px 10px;
}
</style>

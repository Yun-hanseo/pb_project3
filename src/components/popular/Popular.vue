<template>
  <div class="popular-container">

    <!-- 상단 컨트롤 바 -->
    <div class="view-toggle">
      <button
          :class="{ active: viewMode === 'table' }"
          @click="viewMode = 'table'"
      >
        📋 Table View
      </button>

      <button
          :class="{ active: viewMode === 'infinite' }"
          @click="viewMode = 'infinite'"
      >
        🔁 Infinite Scroll
      </button>
    </div>

    <!-- View 전환 -->
    <PopularTable v-if="viewMode === 'table'" />
    <PopularInfinite v-else />

  </div>
</template>

<script setup>
import { ref } from "vue";
import PopularTable from "./PopularTable.vue";
import PopularInfinite from "./PopularInfinite.vue";

/* -------------------------
   View 상태
------------------------- */
const viewMode = ref("table"); // 기본: Table View
</script>

<style scoped>
.popular-container {
  width: 100%;
  padding: 20px;
}

/* 전환 버튼 영역 */
.view-toggle {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.view-toggle button {
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #f8f8f8;
  transition: 0.2s;
}

.view-toggle button.active {
  background: #333;
  color: white;
  border-color: #333;
}
</style>


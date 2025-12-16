<template>
  <div class="popular-container">

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

    <PopularTable v-if="viewMode === 'table'" />
    <PopularInfinite v-else />

  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import PopularTable from "./PopularTable.vue";
import PopularInfinite from "./PopularInfinite.vue";

const viewMode = ref("table"); // 기본: Table View

watch(viewMode, (mode) => {
  if (mode === "table") {
    document.body.style.overflow = "hidden"; // 🔒 스크롤 차단
  } else {
    document.body.style.overflow = ""; // 🔓 스크롤 허용
  }
});

// 페이지 나갈 때 반드시 원복
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.popular-container {
  width: 100%;
  padding: 20px;
}

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


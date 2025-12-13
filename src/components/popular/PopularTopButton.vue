<template>
  <button class="top-button" @click="scrollToTop">
    ⬆ TOP
  </button>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<style scoped>
.top-button {
  position: fixed;
  right: 24px;
  bottom: 24px;

  padding: 10px 16px;
  font-size: 14px;
  font-weight: bold;

  background: #222;
  color: #fff;
  border: none;
  border-radius: 20px;

  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  transition: transform 0.2s ease, opacity 0.2s ease;
}

.top-button:hover {
  transform: translateY(-4px);
}
</style>

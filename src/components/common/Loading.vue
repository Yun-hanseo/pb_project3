<template>
  <div class="loading-wrap">
    <div class="spinner"></div>
    <p class="text">로딩중...</p>
  </div>
</template>

<style scoped>
.loading-wrap {
  width: 100%;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aaa;
}

.spinner {
  width: 42px;
  height: 42px;
  border: 4px solid rgba(255,255,255,0.2);
  border-top: 4px solid #e50914;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.text {
  margin-top: 12px;
  font-size: 14px;
  letter-spacing: 1px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

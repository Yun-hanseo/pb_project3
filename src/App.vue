<template>
  <div>
    <Header v-if="showHeader" />
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/common/Header.vue";
import { useAuth } from "./composables/useAuth.js";

const { isLoggedIn } = useAuth();
const route = useRoute();

/* 로그인 상태 + 로그인 페이지 아닐 때만 Header 표시 */
const showHeader = computed(() => {
  return isLoggedIn.value && route.path !== "/signin";
});
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: white;
  overflow-x: hidden;/* 🔥 기본 배경을 검정으로 */
}
</style>
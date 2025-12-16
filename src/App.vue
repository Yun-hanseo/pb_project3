<template>
  <div>
    <Header v-if="showHeader" />

    <RouterView v-slot="{ Component }">
      <transition name="netflix" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
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
  background-color:#1a1a1d;
  overflow-x: hidden;
}
/* ===============================
   🎬 Netflix-style Page Transition
   =============================== */

.netflix-enter-active {
  animation: netflix-in 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.netflix-leave-active {
  animation: netflix-out 0.35s ease-in;
}

/* 들어올 때 */
@keyframes netflix-in {
  0% {
    opacity: 0;
    transform: scale(0.96) translateY(30px);
    filter: brightness(0.7);
  }
  60% {
    opacity: 1;
    transform: scale(1.02) translateY(-4px);
    filter: brightness(1);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 나갈 때 */
@keyframes netflix-out {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: brightness(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.92);
    filter: brightness(0.6);
  }
}
</style>
<!-- src/components/common/Header.vue -->
<template>
  <header class="header">

    <!-- 로고 / 홈 이동 -->
    <h1 class="logo" @click="goHome">PB MOVIE</h1>

    <!-- 네비게이션 메뉴 -->
    <nav class="nav">
      <span @click="go('/')" :class="{ active: isActive('/') }">Home</span>
      <span @click="go('/popular')" :class="{ active: isActive('/popular') }">Popular</span>
      <span @click="go('/now-playing')" :class="{ active: isActive('/now-playing') }">Now Playing</span>
      <span @click="go('/top-rated')" :class="{ active: isActive('/top-rated') }">Top Rated</span>
      <span @click="go('/upcoming')" :class="{ active: isActive('/upcoming') }">Upcoming</span>
    </nav>

    <!-- 오른쪽 영역 -->
    <div class="right-area">
      <span class="user-email">{{ userEmail }}</span>
      <button @click="logoutUser" class="logout-btn">로그아웃</button>
    </div>

  </header>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "../../composables/useAuth.js";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const { logout } = useAuth();

// 현재 로그인 사용자
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

const userEmail = computed(() => currentUser?.email || "Guest");

function goHome() {
  router.push("/");
}

// 메뉴 이동 함수
function go(path) {
  router.push(path);
}

// 현재 활성화된 메뉴 체크
function isActive(path) {
  return route.path === path;
}

// 로그아웃
function logoutUser() {
  logout();
  router.push("/signin");
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background: #111;
  color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 로고 */
.logo {
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
}

/* 메뉴 영역 */
.nav {
  display: flex;
  gap: 18px;
}

.nav span {
  cursor: pointer;
  opacity: 0.8;
  transition: 0.2s;
}

.nav span:hover {
  opacity: 1;
}

.nav .active {
  opacity: 1;
  font-weight: bold;
  border-bottom: 2px solid white;
}

/* 오른쪽 영역 */
.right-area {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  padding: 6px 10px;
  cursor: pointer;
}
</style>

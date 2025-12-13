<template>
  <header class="header">

    <!-- 로고 -->
    <h1 class="logo" @click="go('/')">HOME</h1>

    <!-- 네비게이션 -->
    <nav class="nav">
      <span @click="go('/')" :class="{ active: isActive('/') }">메인</span>
      <span @click="go('/popular')" :class="{ active: isActive('/popular') }">인기</span>
      <span @click="go('/search')" :class="{ active: isActive('/search') }">검색</span>
      <span @click="go('/wishlist')" :class="{ active: isActive('/wishlist') }">찜한 목록</span>
    </nav>

    <!-- 우측 영역 -->
    <div class="right-area">
      <span class="user-email">현재 접속자: {{ userEmail }}</span>
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

const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
const userEmail = computed(() => currentUser?.email || "Guest");

function go(path) {
  router.push(path);
}

function isActive(path) {
  return route.path === path;
}

function logoutUser() {
  logout();
  alert("로그아웃되었습니다!");
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

/* 네비게이션 */
.nav {
  display: flex;
  gap: 20px;
  margin-right:900px;
}

.nav span {
  cursor: pointer;
  opacity: 0.7;
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

/* 우측 */
.right-area {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-email {
  font-size: 13px;
  opacity: 0.8;
  margin-right: 10px;
}

.logout-btn {
  padding: 6px 10px;
  cursor: pointer;
  margin-right: 50px;
}
</style>


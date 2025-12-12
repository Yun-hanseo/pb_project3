<template>
  <div>
    <Header v-if="isLoggedIn" />
    <RouterView />
  </div>
</template>

<script setup>
import Header from "./components/common/Header.vue";
import { useAuth } from "./composables/useAuth.js";

const { isLoggedIn } = useAuth();
</script>

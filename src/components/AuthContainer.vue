<template>
  <div class="flip-wrapper">
    <div class="flip-card" :class="{ flipped: !isLogin }">

      <!-- 로그인 카드 면 -->
      <div class="flip-face front">
        <h2>로그인</h2>
        <LoginForm
            @switchToRegister="switchToRegister"
            @loginSuccess="handleLoginSuccess"
            @loginFail="handleLoginFail"
        />
      </div>

      <!-- 회원가입 카드 면 -->
      <div class="flip-face back">
        <h2>회원가입</h2>
        <RegisterForm
            @switchToLogin="switchToLogin"
            @registerSuccess="handleRegisterSuccess"
            @registerFail="handleRegisterFail"
        />
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

const router = useRouter();

const isLogin = ref(true);

function switchToRegister() { isLogin.value = false; }
function switchToLogin() { isLogin.value = true; }

function handleLoginSuccess(msg) {
  alert(msg);
  router.push("/");
}
function handleLoginFail(error) { alert(error); }

function handleRegisterSuccess(msg) {
  alert(msg);
  isLogin.value = true;
}
function handleRegisterFail(error) { alert(error); }
</script>

<style scoped>
.flip-wrapper {
  perspective: 1200px; /* 카드가 더 자연스럽게 회전하게 함 */
  width: 350px;
  margin: 80px auto;
}

.flip-card {
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  position: relative;
}

/* 뒤집힌 상태 */
.flip-card.flipped {
  transform: rotateY(180deg);
}

/* 앞/뒤 면 공통 */
.flip-face {
  position: absolute;
  width: 100%;
  backface-visibility: hidden; /* 뒷면 숨기기 */
  padding: 20px;
  border: 1px solid #555;
  border-radius: 10px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
}

/* 뒷면 스타일 */
.back {
  transform: rotateY(180deg);
}
</style>


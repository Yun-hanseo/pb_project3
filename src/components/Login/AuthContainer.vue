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
/* 배경 (넷플릭스 느낌 유지) */
.flip-wrapper {
  position: fixed;          /* 🔥 핵심 */
  inset: 0;                 /* top/right/bottom/left = 0 */
  display: flex;
  align-items: center;      /* 수직 중앙 */
  justify-content: center;  /* 수평 중앙 */

  background:
      linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
      url("/netflix.png");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 카드 회전 컨테이너 */
.flip-card {
  width: 500px;                 /* 🔥 카드 크게 */
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1.0s ease;

  min-height: 700px;
  transform: translateX(-30px);
}

.flip-card.flipped {
  transform: rotateY(180deg);
}

/* 앞/뒤 카드 공통 */
.flip-face {
  position: absolute;
  width: 100%;
  backface-visibility: hidden;

  padding: 40px 26px;           /* 🔥 넉넉한 여백 */
  border-radius: 16px;

  background: rgba(0,0,0,0.6);  /* 🔥 반투명 */
  backdrop-filter: blur(8px);

  box-shadow:
      0 20px 50px rgba(0,0,0,0.6),
      0 0 0 1px rgba(255,255,255,0.06);

  color: white;
}

/* 제목 */
.flip-face h2 {
  margin-bottom: 32px;
  font-size: 34px;
  font-weight: 700;
}

/* 뒷면 */
.back {
  transform: rotateY(180deg) translateX(20px);
}


/* 반응형 */
@media (max-width: 500px) {
  .flip-card {
    width: 340px;
  }
  .flip-face {
    padding: 40px 28px;
  }
  .flip-face h2 {
    font-size: 26px;
  }
}

</style>


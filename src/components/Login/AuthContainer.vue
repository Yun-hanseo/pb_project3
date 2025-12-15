<template>
  <div class="flip-wrapper">
    <div class="flip-card" :class="{ flipped: !isLogin }">

      <div class="flip-face front">
        <h2>로그인</h2>
        <LoginForm
            @switchToRegister="switchToRegister"
            @loginSuccess="handleLoginSuccess"
            @loginFail="handleLoginFail"
        />
      </div>

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
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  background:
      linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
      url("/netflix.png");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.flip-card {
  width: 500px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1.0s ease;

  min-height: 700px;
  transform: translateX(-30px);
}

.flip-card.flipped {
  transform: rotateY(180deg);
}

.flip-face {
  position: absolute;
  width: 100%;
  backface-visibility: hidden;

  padding: 40px 26px;
  border-radius: 16px;

  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);

  box-shadow:
      0 20px 50px rgba(0,0,0,0.6),
      0 0 0 1px rgba(255,255,255,0.06);

  color: white;
}


.flip-face.back {
  transform: translateX(-12px);
}

.flip-face.front {
  transform: rotateY(180deg) translateX(20px);
}

.flip-face h2 {
  margin-bottom: 32px;
  font-size: 34px;
  font-weight: 700;
}

.back {
  transform: rotateY(180deg) translateX(20px);
}


@media (max-width: 480px) {

  .flip-wrapper {
    padding: 25px;
  }

  .flip-card {
    width: 80%;
    min-height: 500px;

    transform: none;
  }

  .flip-card.flipped {
    transform: rotateY(180deg);
  }

  .flip-face {
    padding: 28px 20px;
  }

  .flip-face h2 {
    font-size: 24px;
    margin-bottom: 22px;
  }

  .back {
    transform: rotateY(180deg);
  }
}

.flip-face.front {
  transform: translateX(-12px);
}

.flip-face.back {
  transform: rotateY(180deg) translateX(20px);
}


</style>


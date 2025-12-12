<template>
  <div class="register-form">

    <!-- 아이디 (이메일) -->
    <div>
      <label>아이디 (Email)</label>
      <input
          type="text"
          v-model="email"
          placeholder="이메일 입력"
      />
    </div>

    <!-- TMDB API Key -->
    <div style="margin-top: 10px;">
      <label>TMDB API Key</label>
      <input
          type="password"
          v-model="password"
          placeholder="TMDB API Key 입력"
      />
    </div>

    <!-- TMDB API Key 확인 -->
    <div style="margin-top: 10px;">
      <label>TMDB API Key 확인</label>
      <input
          type="password"
          v-model="passwordCheck"
          placeholder="TMDB API Key 다시 입력"
      />
    </div>

    <!-- 약관 동의 -->
    <div style="margin-top: 10px;">
      <input
          type="checkbox"
          v-model="agree"
          id="agree"
      />
      <label for="agree">약관에 동의합니다 (필수)</label>
    </div>

    <!-- 회원가입 버튼 -->
    <button style="margin-top: 20px;" @click="onRegisterClick">
      회원가입
    </button>

    <!-- 로그인으로 이동 -->
    <div style="margin-top: 15px;">
      <p>
        이미 회원이신가요?
        <span class="switch" @click="switchToLogin">로그인</span>
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../../composables/useAuth.js";


// 입력값
const email = ref("");
const password = ref("");         // TMDB KEY
const passwordCheck = ref("");    // TMDB KEY 확인
const agree = ref(false);

// Auth 로직
const { register } = useAuth();

// 부모에게 이벤트 전달
const emit = defineEmits([
  "registerSuccess",
  "registerFail",
  "switchToLogin"
]);

// 회원가입 버튼 클릭
async function onRegisterClick() {
  const result = await register({
    email: email.value,
    password: password.value,
    passwordCheck: passwordCheck.value,
    agree: agree.value
  });

  if (result.success) {
    emit("registerSuccess", result.message);
  } else {
    emit("registerFail", result.message);
  }
}

// 로그인으로 전환
function switchToLogin() {
  emit("switchToLogin");
}
</script>

<style scoped>
.switch {
  color: skyblue;
  cursor: pointer;
}
</style>


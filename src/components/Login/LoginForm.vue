<template>
  <div class="login-form">

    <!-- 아이디 입력 -->
    <div>
      <label>아이디 (Email)</label>
      <input
          type="text"
          v-model="email"
          placeholder="이메일 입력"
      />
    </div>

    <!-- TMDB API Key 입력 -->
    <div style="margin-top: 10px;">
      <label>TMDB API Key</label>
      <input
          type="password"
          v-model="password"
          placeholder="TMDB API Key 입력"
      />
    </div>

    <!-- Remember Me -->
    <div style="margin-top: 10px;">
      <input
          type="checkbox"
          v-model="remember"
          id="remember"
      />
      <label for="remember">Remember Me</label>
    </div>

    <!-- 로그인 버튼 -->
    <button style="margin-top: 20px;" @click="onLoginClick">
      로그인
    </button>

    <!-- 회원가입으로 이동 -->
    <div style="margin-top: 15px;">
      <p>
        아직 회원이 아니신가요?
        <span class="switch" @click="switchToRegister">회원가입</span>
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../../composables/useAuth.js";

// 입력값
const email = ref("");
const password = ref("");    // ← TMDB API Key 저장
const remember = ref(false);

// Auth 로직
const { login } = useAuth();

// 부모에게 이벤트 전달
const emit = defineEmits([
  "loginSuccess",
  "loginFail",
  "switchToRegister"
]);

// 최초 진입 시, rememberEmail 있으면 자동 채우기
onMounted(() => {
  const rememberedEmail = localStorage.getItem("rememberEmail");
  const keepLogin = localStorage.getItem("keepLogin") === "true";

  if (rememberedEmail) {
    email.value = rememberedEmail;
  }
  if (keepLogin) {
    remember.value = true;
  }
});

// 로그인 버튼 클릭
function onLoginClick() {
  const result = login({
    email: email.value,
    password: password.value,   // TMDB API KEY 전달
    remember: remember.value,
  });

  if (result.success) {
    emit("loginSuccess", result.message);
  } else {
    emit("loginFail", result.message);
  }
}

// 회원가입으로 전환
function switchToRegister() {
  emit("switchToRegister");
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-form label {
  font-size: 13px;
  color: #b3b3b3;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 90%;
  padding: 14px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.15);

  background: rgba(255,255,255,0.08); /* 🔥 쨍함 제거 */
  color: white;
}

.login-form input::placeholder {
  color: rgba(255,255,255,0.5);
}

.login-form input:focus {
  outline: none;
  border-color: #e50914;
  box-shadow: 0 0 0 2px rgba(229,9,20,0.25);
}

.login-form button {
  margin-top: 12px;
  padding: 16px;
  border-radius: 6px;
  border: none;

  background: #e50914;
  color: white;
  font-size: 16px;
  font-weight: 600;

  cursor: pointer;
}

.login-form button:hover {
  background: #f6121d;
}

.switch {
  color: #4dabff;
  cursor: pointer;
}

</style>


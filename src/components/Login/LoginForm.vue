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

    <!-- 비밀번호 입력 -->
    <div style="margin-top: 10px;">
      <label>비밀번호</label>
      <input
          type="password"
          v-model="password"
          placeholder="비밀번호 입력"
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
const password = ref("");
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
    password: password.value,
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
.switch {
  color: skyblue;
  cursor: pointer;
}
</style>


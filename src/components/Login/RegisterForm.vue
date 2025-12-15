<template>
  <div class="register-form">

    <div>
      <label>아이디 (Email)</label>
      <input
          type="text"
          v-model="email"
          placeholder="이메일 입력"
      />
    </div>

    <div style="margin-top: 10px;">
      <label>TMDB API Key</label>
      <input
          type="password"
          v-model="password"
          placeholder="TMDB API Key 입력"
      />
    </div>

    <div style="margin-top: 10px;">
      <label>TMDB API Key 확인</label>
      <input
          type="password"
          v-model="passwordCheck"
          placeholder="TMDB API Key 다시 입력"
      />
    </div>

    <div style="margin-top: 10px;">
      <input
          type="checkbox"
          v-model="agree"
          id="agree"
      />
      <label for="agree">약관에 동의합니다 (필수)</label>
    </div>

    <button style="margin-top: 20px;" @click="onRegisterClick">
      회원가입
    </button>

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


const email = ref("");
const password = ref("");
const passwordCheck = ref("");
const agree = ref(false);

const { register } = useAuth();

const emit = defineEmits([
  "registerSuccess",
  "registerFail",
  "switchToLogin"
]);

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

function switchToLogin() {
  emit("switchToLogin");
}
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.register-form label {
  font-size: 13px;
  color: #b3b3b3;
}

.register-form input[type="text"],
.register-form input[type="password"] {
  width: 90%;
  padding: 14px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.15);

  background: rgba(255,255,255,0.08);
  color: white;
}

.register-form input::placeholder {
  color: rgba(255,255,255,0.5);
}

.register-form input:focus {
  outline: none;
  border-color: #e50914;
  box-shadow: 0 0 0 2px rgba(229,9,20,0.25);
}

.register-form button {
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

.register-form button:hover {
  background: #f6121d;
}

.switch {
  color: #4dabff;
  cursor: pointer;
}

@media (max-width: 480px) {

  .register-form {
    gap: 10px;
  }

  .register-form input[type="text"],
  .register-form input[type="password"] {
    width: 90%;
    padding: 12px;
    font-size: 14px;
  }

  .register-form button {
    padding: 14px;
    font-size: 15px;
  }

  .register-form label {
    font-size: 12px;
  }

}

/* 📱 모바일 가로모드 대응 */
@media (orientation: landscape) and (max-width: 900px) {

  .register-form {
    gap: 2px;
  }

  .register-form input[type="text"],
  .register-form input[type="password"] {
    width: 90%;
    padding: 10px;
    font-size: 13px;
  }

  .register-form button {
    padding: 12px;
    font-size: 14px;
  }

  .register-form label {
    font-size: 12px;
  }
}

</style>

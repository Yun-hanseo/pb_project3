// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

const app = createApp(App);

// 라우터 등록
app.use(router);

// 앱 마운트
app.mount("#app");

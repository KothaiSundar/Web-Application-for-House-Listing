import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import router from "./routers";

createApp(App).use(router).use(createPinia()).mount("#app");

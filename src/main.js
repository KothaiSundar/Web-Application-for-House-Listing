import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
// import './components/assets/styles/styles.css';
// import '../c/assets/styles/styles.css';
import router from "./routers";

createApp(App).use(router).use(createPinia()).mount("#app");

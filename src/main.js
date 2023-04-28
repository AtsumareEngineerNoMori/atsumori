import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./micromodal";
import './assets/main.css'
import "./css/micromodal.css";
// import "./css/header/Header.css";



import "./css/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

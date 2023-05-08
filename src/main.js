import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./micromodal";
import './assets/main.css'
import "./css/micromodal.css";
import "./css/Header.css";
import "./css/main.css";
import VueCookies from "vue-cookies";


const app = createApp(App);

app.use(router);
app.use(VueCookies, { expires: "7d" });

app.mount("#app");

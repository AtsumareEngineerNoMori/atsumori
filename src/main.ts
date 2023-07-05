import { createApp, inject } from "vue";
import App from "./App.vue";
import router from "./router";
import "./micromodal";
import "./assets/main.css";
import "./css/micromodal.css";
import "./css/header/Header.css";
import "./css/main.css";
import VueCookies from "vue-cookies";
// import type { VueCookies as TsVueCookies } from 'vue-cookies'
// import axios from "axios";
// import VueAxios from "vue-axios";


const app:any = createApp(App);

// const $cookies = inject<TsVueCookies>('$cookies')

app.use(router);
app.use(VueCookies, {expires: "7d"});
// app.use(VueAxios, axios);


app.mount("#app");


export { app };

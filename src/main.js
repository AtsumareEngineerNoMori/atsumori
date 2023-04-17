import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

<<<<<<< HEAD
import "./assets/main.css";
import "./css/main.css";
=======
import './css/main.css';

>>>>>>> 417dd369f8017e430c7264704bd38d211d13651e

const app = createApp(App);

app.use(router);

app.mount("#app");

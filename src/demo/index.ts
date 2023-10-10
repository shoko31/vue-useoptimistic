import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

console.log(
  "%cWarning! console.* methods will be removed in production build!",
  "font-size: 34px; font-weight: bold; color: white; background-color: red; padding: 10px; margin: 0;"
);

createApp(App).mount("#app");

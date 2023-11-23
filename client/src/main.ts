import { createApp } from "vue";
import App from "./App.vue";
import "./assets/global.css";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus, faBell, faTrashCan, faPenToSquare);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
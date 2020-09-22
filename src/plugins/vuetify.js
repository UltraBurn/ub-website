import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import themes from "@/plugins/themes.js";

import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: themes.theme1.light,
    },
  },
});

import Vue from "vue";
import YmapPlugin from "vue-yandex-maps";

const settings = {
  apiKey: "",
  lang: "ru_RU"
};

Vue.use(YmapPlugin, settings);

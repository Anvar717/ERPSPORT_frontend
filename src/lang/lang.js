import Vue from "vue";
import VueI18n from "vue-i18n";

import uz_latn from "./langMessages/uz_latn.json";
import uz_cyrl from "./langMessages/uz_cyrl.json";
import ru from "./langMessages/ru.json";
import uzLang from "element-ui/lib/locale/lang/uz-UZ";
import ruLang from "element-ui/lib/locale/lang/ru-RU";
import uzCyrillic from "./langMessages/uzCyrillic";

Vue.use(VueI18n);
uzLang.el.select = {
  loading: "Yuklanmoqda",
  noMatch: "Mos ma'lumot yo'q",
  noData: "Ma'lumot yo'q",
  placeholder: "Tanlang",
};
const locale = localStorage.getItem("locale") || "uz_cyrl";

const messages = {
  uz_latn: {
    ...uz_latn,
    ...uzLang,
  },
  uz_cyrl: {
    ...uz_cyrl,
    ...uzCyrillic,
  },
  ru: {
    ...ru,
    ...ruLang,
  },
};

const i18n = new VueI18n({
  locale,
  messages,
});

export default i18n;

// import 'core-js/stable'
import Vue from "vue";
import App from "./App";
import VueAxios from "vue-axios";
import axios from "axios";
import router from "@/router";
import store from "./store";
import "./mixins";
import "@/plugins/bootstrap.js";

import i18n from "./lang/lang";
import * as VueGoogleMaps from "vue2-google-maps";
import { iconsSet as icons } from "./assets/icons/icons.js";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "@/plugins/VueSelect.js";
import "material-icons/iconfont/material-icons.css";
import VueCurrencyInput from "vue-currency-input";

import VueCurrencyFilter from "vue-currency-filter";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { confirmed } from "vee-validate/dist/rules";
import { integer } from "vee-validate/dist/rules";
import { regex } from "vee-validate/dist/rules";
import { min } from "vee-validate/dist/rules";
import { max } from "vee-validate/dist/rules";
import { email } from "vee-validate/dist/rules";
import { abilitiesPlugin } from "@casl/vue";
import { ability } from "./store/ability";
import ApiService from "./services/api.service";
import CustomNumberInput from "@/components/CustomNumberInput";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ru";
import { TokenService } from "./services/storage.service";
import SchoolYearService from "./services/SchoolYear.service";
// import VueMask from 'di-vue-mask'
import wb from "./registerServiceWorker";
import VueMask from "v-mask";
import MyToastPlugin from "@/plugins/toast.plugin";
import customSearch from '@/components/customSearch.vue'
import summaInput from '@/components/summaInput.vue'
import ElementUI from "element-ui";
import "@/assets/scss/element-variables.scss"
// import '@/assets/theme/index.css'
// import 'element-ui/lib/theme-chalk/index.css';

console.log("i18n.locale ", i18n.locale )
Vue.use(ElementUI,  {
  i18n: (key, value) => i18n.t(key, value),
  size: 'medium'
})
Vue.use(MyToastPlugin);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDoX7U1etxawoz-Z3wNCOv7LxcweRiHC-E",
    // key:'AIzaSyBN6gdq_dI68OK4atPtDPA2gLP_MCOgSAE',
    libraries: "places",
    async: true,
    defer: true,
  },
});
Vue.use(VueMask);
Vue.use(VueAxios, axios);
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);
Vue.prototype.$workbox = wb;
/** Activate vue.js plugins **/

Vue.use(VueMask);
const pluginOptions = {
  globalOptions: {
    currency: null,
    hideCurrencySymbol: false,
    autoDecimalMode: true,
    locale: "sv-SE",
  },
};
Vue.use(VueCurrencyInput, pluginOptions);
Vue.use(abilitiesPlugin, ability);
Vue.component("custom-number-input", CustomNumberInput);
Vue.component("date-picker", DatePicker);
Vue.component("custom-search",customSearch)
Vue.component("summa-input",summaInput)
extend("required", {
  ...required,
  //+ values._field_
  message: (_, values) => i18n.t("requiredValidate"),
});
extend("email", {
  ...email,
  //+ values._field_
  message: (_, values) => i18n.t("incorrectformat"),
});
extend("regex", {
  ...regex,
  //+ values._field_
  message: (_, values) => i18n.t("incorrectformat"),
});
extend("integer", {
  ...integer,
  //+ values._field_
  message: (_, values) => "s",
});
extend("min", {
  ...min,
  //+ values._field_
  message: (_, values) => "s",
});
extend("max", {
  ...max,
  //+ values._field_
  message: (_, values) => i18n.t("notmaxthan"),
});
extend("confirmed", {
  ...confirmed,
  //+ values._field_
  message: (_, values) => i18n.t("notsamepassword"),
});
extend("positive", (value) => {
  if (value >= 0) {
    return true;
  }

  return "s";
});

extend("notempty", (value) => {
  if (value !== "") {
    return true;
  }

  return "The {_field_} field must be a positive number";
});

//axios.defaults.baseURL = 'http://localhost:5000/'
// axios.defaults.baseURL = 'http://eduerp-api.apptest.uz/'
axios.defaults.baseURL = "http://sporterptest-api.apptest.uz/";
// axios.defaults.baseURL = "http://erp-api.sport.uz/";
// axios.defaults.baseURL = 'https://erp-api.sport.uz/'
// axios.defaults.baseURL = 'https://erp-api.maktab.uz/'
if (window.location.href.indexOf("http://eduerp.apptest") > -1) {
  axios.defaults.baseURL = "http://eduerp-api.apptest.uz/";
}
// if (window.location.href.indexOf('https://erp.sport.uz') > -1) {
// 	axios.defaults.baseURL = 'https://erp-api.sport.uz/'
// }
if (window.location.href.indexOf("http://erp.sport.uz") > -1) {
  axios.defaults.baseURL = "http://erp-api.sport.uz/";
}
if (window.location.href.indexOf("https://erp.sport.uz") > -1) {
  axios.defaults.baseURL = "https://erp-api.sport.uz/";
}
if (window.location.href.indexOf("http://erpnext.sport.uz") > -1) {
  axios.defaults.baseURL = "http://erpnext-api.sport.uz/";
}
if (window.location.href.indexOf("https://erpnext.sport.uz") > -1) {
  axios.defaults.baseURL = "https://erpnext-api.sport.uz/";
}
// if (window.location.href.indexOf('http://eduerptest.apptest') > -1) {
// 	axios.defaults.baseURL = 'http://eduerptest-api.apptest.uz/'
// }
// if (window.location.href.indexOf('https://eduerptest.apptest') > -1) {
// 	axios.defaults.baseURL = 'https://eduerptest-api.apptest.uz/'
// }
if (window.location.href.indexOf("http://sporterptest.apptest") > -1) {
  axios.defaults.baseURL = "http://sporterptest-api.apptest.uz/";
}
if (window.location.href.indexOf("http://erptest.sport.uz") > -1) {
  axios.defaults.baseURL = "http://erptest-api.sport.uz/";
}
if (window.location.href.indexOf("https://erptest.sport.uz") > -1) {
  axios.defaults.baseURL = "https://erptest-api.sport.uz/";
}
if (window.location.href.indexOf("http://erp.sport.uz") > -1) {
  axios.defaults.baseURL = "http://erp-api.sport.uz/";
}
if (window.location.href.indexOf("http://sporterp.apptest") > -1) {
  axios.defaults.baseURL = "http://sporterp-api.apptest.uz/";
}
if (window.location.href.indexOf("https://sporterp.apptest") > -1) {
  axios.defaults.baseURL = "https://sporterp-api.apptest.uz/";
}
if (window.location.href.indexOf("http://erp.maktab") > -1) {
  axios.defaults.baseURL = "http://erp-api.maktab.uz/";
}
if (window.location.href.indexOf("https://erp.maktab") > -1) {
  axios.defaults.baseURL = "https://erp-api.maktab.uz/";
}
// axios.defaults.baseURL = 'http://sporterptest-api.apptest.uz/'
// axios.defaults.baseURL = 'http://sporterptest-api.apptest.uz/'
//axios.defaults.baseURL = 'https://erpnext-api.maktab.uz/'
//axios.defaults.baseURL = 'http://erp-api.maktab.uz/'s
// axios.defaults.baseURL = "http://ssverp-api.apptest.uz/";

if (window.location.href.indexOf("http://ssverp.apptest") > -1) {
  axios.defaults.baseURL = "http://ssverp-api.apptest.uz/";
}
if (window.location.href.indexOf("http://eduerp.apptest") > -1) {
  axios.defaults.baseURL = "http://eduerp-api.apptest.uz/";
}
if (window.location.href.indexOf("https://eduerp.apptest") > -1) {
  axios.defaults.baseURL = "https://eduerp-api.apptest.uz/";
}
if (window.location.href.indexOf("http://ssverp.apptest.uz") > -1) {
  axios.defaults.baseURL = "http://ssverp-api.apptest.uz/";
}
if (window.location.href.indexOf("https://ssverp.apptest.uz/") > -1) {
  axios.defaults.baseURL = "https://ssverp-api.apptest.uz/";
}
if (window.location.href.indexOf("http://sporterptest.apptest") > -1) {
  axios.defaults.baseURL = "http://sporterptest-api.apptest.uz/";
}
if (window.location.href.indexOf("http://erp.maktab") > -1) {
  axios.defaults.baseURL = "http://erp-api.maktab.uz/";
}
if (window.location.href.indexOf("https://erp.maktab") > -1) {
  axios.defaults.baseURL = "https://erp-api.maktab.uz/";
}
if (window.location.href.indexOf("http://erpnext.maktab") > -1) {
  axios.defaults.baseURL = "http://erpnext-api.maktab.uz/";
}
if (window.location.href.indexOf("https://erpnext.maktab") > -1) {
  axios.defaults.baseURL = "https://erpnext-api.maktab.uz/";
}
if (window.location.href.indexOf("https://erpitsm.maktab.uz") > -1) {
  axios.defaults.baseURL = "https://erpitsm-api.maktab.uz/";
}
axios.defaults.headers.common.lang_code = localStorage.getItem("locale") || 'uz_cyrl'
Vue.prototype.$clientUrl = window.location.href.split("?")[0];
axios.interceptors.request.use((request) => requestInterceptor(request));
Vue.prototype.$clientUrl = window.location.href.split("?")[0];
const requestInterceptor = (request) => {
  request.withCredentials = true;
  return request;
};

// console.log(axios.interceptors)
// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader();
  ApiService.mount401Interceptor();
}
if (!!localStorage.getItem("user_info")) {
  SchoolYearService.GetDefault().then((res) => {
    localStorage.setItem("default_school_year", res.data.id);
  });
}

Vue.config.performance = true;

Vue.use(VueCurrencyFilter, {
  symbol: "",
  thousandsSeparator: " ",
  fractionCount: 0,
  fractionSeparator: ",",
  symbolPosition: "back",
  symbolSpacing: true,
});

import CoreuiVue from "@coreui/vue";
Vue.use(CoreuiVue);

import { ValidationProvider, ValidationObserver } from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.use(Vuesax);

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  icons,
  template: "<App/>",
  components: {
    App,
  },
});

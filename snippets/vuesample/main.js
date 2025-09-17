import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue,BootstrapVueIcons } from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../static/assets/css/base.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// sweatelert2オプションセット
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

// 開発環境・本番環境のURL切り替え
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV,
});
export default axiosInstance;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://localhost:3000';

axios.defaults.timeout = 3000;
const service = axios.create({});
service.interceptors.request.use(
  (config) => {
    return config;
  }
),
(error) => {
  return Promise.reject(error);
}
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2, options);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.config.ignoredElements = ['xml', 'category', 'variable', 'field', 'value', 'comment', 'mutation', 'statement', 'variables', 'next']
// 子コンポーネント内でも扱えている
Vue.prototype.glob = new Vue;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

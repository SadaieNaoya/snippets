import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home'
import Dashboard from '@/views/Dashboard'
import Mail from '@/views/static/Mail'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/mail',
      name: 'mail',
      component: Mail
    },
  ]
})

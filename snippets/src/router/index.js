import Vue from 'vue'
import Router from 'vue-router'

// viewsフォルダの3ファイル（ファイル名は命名規則どおりパスカルケースにしてください）
import Index from '@/views/Index'
import Add from '@/views/Add'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  mode: 'history', // 任意: URLから#/を除きたい場合
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})

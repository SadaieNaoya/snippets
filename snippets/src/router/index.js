import Vue from 'vue'
import Router from 'vue-router'

// viewsフォルダの3ファイル（ファイル名は命名規則どおりパスカルケースにしてください）
import Index from '@/views/Index'
import Add from '@/views/AddSnippet'
import Settings from '@/views/AddPjLanguages'

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
      path: '/addsnippet',
      name: 'AddSnippet',
      component: Add
    },
    {
      path: '/addpjlanguages',
      name: 'AddPjLanguages',
      component: Settings
    }
  ]
})

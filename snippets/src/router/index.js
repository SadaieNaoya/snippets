import Vue from 'vue'
import Router from 'vue-router'

// 変更：indexコンポーネントを正しくインポート（拡張子は省略OK）
import Index from '@/views/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',   // 名前は任意ですがコンポーネント名などに合わせると良い
      component: Index // ここを新コンポーネントに変更
    }
  ]
})

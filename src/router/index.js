/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default.vue'
import blankPage from '@/layout/blank.vue'
import goodsList from '@/page/goodsList.vue'
import Index from '@/page/index.vue'
import ChangeCity from '@/page/changeCity.vue'
import Login from '@/page/login.vue'
import Register from '@/page/register.vue'
import Detail from '@/page/detail.vue'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/blank',
      name: 'blank',
      component: blankPage,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/',
      name: 'default',
      component: defaultPage,
      redirect: '/index',
      children: [
        {
          path: 's/:name',
          name: 'goods',
          component: goodsList
        },
        {
          path: '/changeCity',
          name: 'changeCity',
          component: ChangeCity
        },
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: 'detail/:parents',
          name: 'detail',
          component: Detail
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {  //如果未匹配到路由,则返回首页
    next('/');
  } else {
    next();
  }
});
export default router

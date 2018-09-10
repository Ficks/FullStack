import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      hidden: true,
      component: resolve => require(['@/components/login.vue'], resolve)
    },
    {
      path: '/',
      name: '首页',
      icon: "icon-wodedamaijihuo",
      component: resolve => require(['@/components/index.vue'], resolve)
    },
    {
      path: '/platform',
      name: '平台介绍',
      icon: "icon-yingyongchengxu",
      component: resolve => require(['@/components/platform.vue'], resolve)
    },
    {
      path: '/engineeringCase',
      name: '工程案例',
      icon: "icon-cangkucangchu",
      component: resolve => require(['@/components/engineeringCase.vue'], resolve)
    },
    {
      path: '/polularScience',
      name: '加建科普',
      icon: "icon-qiyeyuanquwuye",
      component: resolve => require(['@/components/polularScience.vue'], resolve)
    },
    {
      path: '/consultation',
      name: '加装咨询',
      icon: "icon-xin",
      component: resolve => require(['@/components/consultation.vue'], resolve)
    },
    {
      path: '/constructionCenter',
      name: '加建中心',
      icon: "icon-yewu",
      component: resolve => require(['@/components/constructionCenter.vue'], resolve)
    },
    {
      path: '/contactUs',
      name: '关于我们',
      icon: "icon-kefu",
      component: resolve => require(['@/components/contactUs.vue'], resolve)
    },
    {
      path: '/news',
      name: '新闻中心',
      icon: "icon-xinwenzixun",
      component: resolve => require(['@/components/news.vue'], resolve)
    },
    {
      path: '/footer',
      name: 'Footer',
      icon: "icon-xinwenzixun",
      component: resolve => require(['@/components/footer.vue'], resolve)
    },
  ]
})

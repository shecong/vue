import Vue from "vue"
import VueRouter from "vue-router"
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import Login from '../views/Login'
import store from "../store/index" 


Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: 'Login' 
  },
  {
    path: '/Login', component: Login, meta: {
      title: '登录',
      requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/',
    component: Main,
    redirect: '/Home',
    meta: {
      title: '主界面',
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: '/Home', component: Home, meta: {
          title: '首页',
          requireAuth: true
        }
      },
      {
        path: '/User', component: User, meta: {
          title: '首页1',
          requireAuth: true
        }
      },
      {
        path: '/Mall', component: Mall, meta: {
          title: '首页2',
          requireAuth: true
        }
      },
    ]
  } 
] 
const router = new VueRouter({
  // mode: 'history',
  routes, // `routes: routes` 的缩写
})


// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location){
return originalPush.call(this , location).catch(err=>err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location){
return originalReplace.call(this , location).catch(err=>err)
} 
 
// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  const token = store.state.token 
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在 
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

// 5. 创建并挂载根实例
const app = new VueRouter({})
//确保 _use_ 路由实例使
//整个应用支持路由。
export default router
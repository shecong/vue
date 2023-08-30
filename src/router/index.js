import Vue from "vue"
import VueRouter from "vue-router"
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import Login from '../views/Login'
import store from "../store/index"
import Account from '../views/UserChildren/Account.vue'
import Like from '../views/UserChildren/Like.vue'
import MyHtml from '../views/UserChildren/MyHtml.vue'
import Setting from '../views/UserChildren/Setting.vue'
import SingleIR from '../views/UserChildren/SingleIR.vue'


//IM通讯引入
import IMHome from '../views/UserChildren/SingleIRChildren/IMHome.vue'
import IMLogin from '../views/UserChildren/SingleIRChildren/IMLogin.vue'
import IMConversations from '../views/UserChildren/SingleIRChildren/IMConversations.vue'
import IMContacts from '../views/UserChildren/SingleIRChildren/IMContacts.vue'
import IMPrivateChat from '../views/UserChildren/SingleIRChildren/IMPrivateChat.vue'
import IMGroupChat from '../views/UserChildren/SingleIRChildren/IMGroupChat.vue'
//IM通讯引入

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: 'Login', components: {
      default: Main,
      User: User
    }
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
          title: '用户中心',
          requireAuth: true
        }, children: [
          {
            path: '/Account', components: { UserRouter: Account }, meta: {
              title: '账号信息',
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
          },
          {
            path: '/Like', components: { UserRouter: Like }, meta: {
              title: '兴趣爱好',
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
          },
          {
            path: '/MyHtml', components: { UserRouter: MyHtml }, meta: {
              title: '自定义页面',
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
          },
          {
            path: '/Setting', components: { UserRouter: Setting }, meta: {
              title: '系统设置',
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
              keepAlive: true
            }
          },
          {
            path: '/SingleIR', components: { UserRouter: SingleIR }, meta: {
              title: '消息通知',
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
              keepAlive: true
            }, children: [
              {
                path: '/IMHome',
                components: { UserIMRouter: IMHome },
                meta: {
                  keepAlive: true
                },
                children: [
                  {
                    path: '/IMConversations',
                    components: { UserIMSRouter: IMConversations },
                    meta: {
                      keepAlive: true
                    },
                    children: [
                      {
                        path: '/IMPrivateChat/:id',
                        components: { UserIMSRouter: IMPrivateChat },
                        meta: {
                          keepAlive: true
                        },
                      },
                      {
                        path: '/IMGroupChat/:id',
                        components: { UserIMSRouter: IMGroupChat },
                        meta: {
                          keepAlive: true
                        },
                      },
                    ],
                  },
                  {
                    path: '/IMContacts',
                    components: { UserIMSRouter: IMContacts },
                    meta: {
                      keepAlive: true
                    },
                  },
                ],
              },
              {
                path: '/',
                components: { UserIMRouter: IMLogin },
                meta: {
                  keepAlive: true
                },
              },

            ]
          },
        ]
      },
      {
        path: '/Mall', component: Mall, meta: {
          title: '社区信息',
          requireAuth: true
        }
      },
    ]
  },

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
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
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
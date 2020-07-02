import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true, // 不会出现在侧边栏中
    // children: [
    //   {
    //     path: '/redirect/:path(.*)',
    //     component: () => import('@/views/redirect/index')
    //   }
    // ]
  },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // 总是显示根路由
    name: 'Permission',
    meta: {
      title: '权限测试页', // 侧边栏和面包屑导航中的名称
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
      // noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
      // breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
      // affix: true // 若果设置为true，它则会固定在tags-view中(默认 false)
      // 当路由设置了该属性，则会高亮相对应的侧边栏。
      // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
      // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
      // activeMenu: '/article/list'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect', // 表示面包屑导航中不可被点击
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  // children: [
  //   {
  //     path: '401',
  //     component: () => import('@/views/error-page/401'),
  //     name: 'Page401',
  //     meta: { title: 'page401', noCache: true }
  //   },
  //   {
  //     path: '404',
  //     component: () => import('@/views/error-page/404'),
  //     name: 'Page404',
  //     meta: { title: 'page404', noCache: true }
  //   }
  // ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },


  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

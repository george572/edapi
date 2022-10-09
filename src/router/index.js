import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Authentication.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'adminDashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminDashboard.vue')
  },
  {
    path: '/create-task',
    name: 'Create Task',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/CreateTask.vue')
  },
  {
    path: '/admin/user-details/:name',
    name: 'User Details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/user/UserDetails.vue')
  },
  {
    path: '/admin/tasks',
    name: 'All Tasks',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewTasks.vue')
  },
  {
    path: '/user/dashboard',
    name: 'userDashboard',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/user/UserDashboard.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router


const routes = [
  {
    //path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('src/pages/budgets/Index.vue') },
      { path: '/budgets/', component: () => import('src/pages/budgets/Index.vue') },
      { path: '/budgets/create', component: () => import('src/pages/budgets/Create.vue') },
      { path: '/budgets/:idBudget', component: () => import('src/pages/budgets/Update.vue') },
      { path: '/budgets/report/:idBudget', component: () => import('src/pages/budgets/report/Budget.vue') },
      { path: '/customers', component: () => import('src/pages/customer/Index.vue') },
      { path: '/vehicles', component: () => import('src/pages/vehicle/Index.vue') },
      { path: '/parts', component: () => import('src/pages/part/Index.vue') },
      { path: '/providers', component: () => import('src/pages/provider/Index.vue') },
      { path: '/services', component: () => import('src/pages/service/Index.vue') },
      { path: '/company', component: () => import('src/pages/company/Index.vue') }
    ],
    meta:{
      requiresAuth:true
    }
  },
  {
    component: () => import('layouts/MainLogin.vue'),
    children: [
      { path: '/login', name:"login", component: () => import('src/pages/auth/Login.vue') },
      { path: '/signup', name:"signup", component: () => import('src/pages/auth/Signup.vue') },
    ]
  },
{
    path: '/:catchAll(.*)*',
    component: () => import('pages/error/Error404.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/error/Error404.vue'),
  //   meta:{
  //     requiresAuth:true
  //   }
  // },
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/error/Error404.vue'),
  //   meta:{
  //     requiresAuth:false 
  //   }
  // }
]

export default routes

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Appointment from './views/Appointment.vue'
Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/appoint',
            name: 'appoint',
            component: Appointment
        }
    ]
})
router.beforeEach((to, from, next)=>{
    //do something
    if(!Vue.cookie.get('token')) {
        if(to.path !== '/login' && to.path !== '/register') {
            next('/login')
        } else {
            next()
        }
    } else {
        if(to.path === '/login' || to.path === '/register') {
            next('/')
        } else {
            next()
        }
    }
});

export default router

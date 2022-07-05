import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: "/ticket",
        name: "HelloWorld",
        component: () => import('../components/HelloWorld.vue'),
    }
]

const router = new Router({
    mode: 'history',
    routes
})

export default router
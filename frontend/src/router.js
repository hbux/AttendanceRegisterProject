import { createWebHistory, createRouter } from 'vue-router';

import Home from './views/Home.vue'
import RegisterCode from './views/RegisterCode.vue'
import Login from './views/Login.vue'
 
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/registerCode',
        name: 'registerCode',
        component: RegisterCode
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
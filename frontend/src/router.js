import { createWebHistory, createRouter } from 'vue-router';

import Homepage from './pages/Home.vue';
import Register from './pages/Register.vue';
import Login from './pages/Login.vue';
import Code from './pages/Code.vue';
import Portal from './pages/Portal.vue';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: Homepage
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: Register
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: Login
    },
    {
        path: '/code',
        name: 'CodePage',
        component: Code
    },
    {
        path: '/portal',
        name: 'PortalPage',
        component: Portal
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
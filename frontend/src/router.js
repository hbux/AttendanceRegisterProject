import { createWebHistory, createRouter } from 'vue-router';

import Home from './views/Home.vue'
import RegisterCode from './views/RegisterCode.vue'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'
import Course from './views/Course.vue'
import Module from './views/Module.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: Home
    },
    {
        path: '/code/register',
        name: 'registerCode',
        component: RegisterCode
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    },
    {
        path: '/course',
        name: 'course',
        component: Course
    },
    {
        path: '/module',
        name: 'module',
        component: Module
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
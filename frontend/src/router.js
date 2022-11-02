import { createWebHistory, createRouter } from 'vue-router';

import Home from './views/Home.vue'
import RegisterCode from './views/RegisterCode.vue'
import Login from './views/Login.vue'
import Course from './views/Course.vue'
import Module from './views/Module.vue'


 
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
import { createWebHistory, createRouter } from 'vue-router';

import HomePage from './pages/Home.vue';
import LoginPage from './pages/Login.vue';
import CodePage from './pages/Code.vue';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/student/checkin',
        name: 'CodePage',
        component: CodePage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
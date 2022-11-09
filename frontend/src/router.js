import { createWebHistory, createRouter } from 'vue-router';

import HomePage from './pages/Home.vue';
import LoginPage from './pages/Login.vue';
import RegisterPage from './pages/Register.vue';
import CodePage from './pages/Code.vue';
import StaffPage from './pages/Staff.vue';
import AdminPage from './pages/Admin.vue';

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
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    },
    {
        path: '/checkin',
        name: 'CodePage',
        component: CodePage
    },
    {
        path: '/staff',
        name: 'StaffPage',
        component: StaffPage
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
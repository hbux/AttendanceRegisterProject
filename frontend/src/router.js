import { createWebHistory, createRouter } from 'vue-router';

import HomePage from './pages/Home.vue';
import LoginPage from './pages/Login.vue';
import RegisterPage from './pages/Register.vue';
import CodePage from './pages/Code.vue';
import StaffPage from './pages/Staff.vue';
import ManagePage from './pages/Manage.vue';
import AdminPage from './pages/Admin.vue';
import UsersPage from './pages/Users.vue';

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
        path: '/staff/manage/:id',
        name: 'ManagePage',
        component: ManagePage,
        props: true
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage,
        children: [
            {
                path: '',
                name: 'RegisterPage',
                component: RegisterPage
            },
            {
                path: 'users',
                name: 'UsersPage',
                component: UsersPage
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
})

export default router;
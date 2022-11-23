import { createWebHistory, createRouter } from 'vue-router';
import store from './stores/index';


import HomePage from './pages/Home.vue';
import LoginPage from './pages/Login.vue';
import RegisterPage from './pages/Register.vue';
import CodePage from './pages/Code.vue';
import StaffPage from './pages/Staff.vue';
import Registerspage from './pages/Registers.vue';
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
        component: StaffPage,
        children: [
            {
                path: '',
                name: 'RegistersPage',
                component: Registerspage
            }
        ]
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
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (canAccess(to) == true) {
        next();
    }
    else {
        next({ name: 'LoginPage' });
    }
})

const canAccess = function(to) {
    let isAuthenticated = store.getters['userModule/isAuthenticated'];
    let isInStudentRole = store.getters['userModule/isInStudentRole'];
    let isInTutorRole = store.getters['userModule/isInTutorRole'];
    let isInModuleLeaderRole = store.getters['userModule/isInModuleLeaderRole'];
    let isInAdminRole = store.getters['userModule/isInAdminRole'];
    let authStatus = store.getters['userModule/username'];

    console.log("Authenticated: " + isAuthenticated);
    console.log("Student: " + isInStudentRole);
    console.log("Tutor: " + isInTutorRole);
    console.log("ML: " + isInModuleLeaderRole);
    console.log("Admin: " + isInAdminRole);
    console.log(authStatus);

    if (to.name == 'LoginPage') {
        return true;
    }
    if (to.name == 'CodePage' && isInStudentRole == true) {
        return true;
    }
    if (to.name == 'StaffPage' && (isInTutorRole || isInModuleLeaderRole)) {
        return true;
    }
    if (to.name == 'RegistersPage' && (isInTutorRole || isInModuleLeaderRole)) {
        return true;
    }
    if (to.name == 'ManagePage' && (isInTutorRole || isInModuleLeaderRole)) {
        return true;
    }
    if (to.name == 'AdminPage' && isInAdminRole == true) {
        return true;
    }
    if (to.name == 'RegisterPage' && isInAdminRole == true) {
        return true;
    }
    if (to.name == 'UsersPage' && isInAdminRole == true) {
        return true;
    }

    return false;
}

export default router;
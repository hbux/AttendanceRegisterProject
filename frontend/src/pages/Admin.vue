<template>
    <div v-if="isInAdminRole">
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">Admin Portal</a>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link to="/admin/" :exact-active-class="active" class="nav-link">Create user
                        </router-link>
                        <router-link to="/admin/users" active-class="active" class="nav-link">Manage Users</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
    <div v-else></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'AdminPage',
    computed: {
        ...mapGetters({
            isAuthenticated: 'userModule/isAuthenticated',
            username: 'userModule/username',
            isInStudentRole: 'userModule/isInStudentRole',
            isInTutorRole: 'userModule/isInTutorRole',
            isInAdminRole: 'userModule/isInAdminRole'
        })
    },
}
</script>
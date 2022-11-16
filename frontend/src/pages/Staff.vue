<template>
    <div v-if="isInTutorRole">
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">Staff Portal</a>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link to="/staff/" active-class="active" class="nav-link">My Registers</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
    <div v-else>
        <button class="btn btn-primary" @click="redirectMe()">f</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'StaffPage',
    computed: {
        ...mapGetters({
            isAuthenticated: 'userModule/isAuthenticated',
            username: 'userModule/username',
            isInStudentRole: 'userModule/isInStudentRole',
            isInTutorRole: 'userModule/isInTutorRole',
            isInAdminRole: 'userModule/isInAdminRole'
        })
    },
    methods: {
        ...mapActions({
            logout: 'userModule/logoutAction'
        }),
        redirectMe() { this.$router.push('/') }

    }
}


</script>
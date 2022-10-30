<template>
    <div v-if="isAuthenticated" class="d-flex align-items-center">
        <p class="p-0 m-0 text-black">Hello <span class="fw-bold">{{ username }}</span>!</p>
        <button @click="handleLogout" type="button" class="btn btn-outline-dark mx-3">Logout</button>
    </div>
    <div v-else>
        <a href="/login" class="mx-3">Login</a>
    </div>

</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'LoginDisplay',
        computed: {
            ...mapGetters({
                isAuthenticated: 'authenticationModule/isAuthenticated',
                username: 'authenticationModule/username'
            })
        },
        methods: {
            ...mapActions({
                logout: 'authenticationModule/logoutAction'
            }),
            handleLogout() {
                this.logout();
                this.$router.push('/');
            }
        }
    }
</script>
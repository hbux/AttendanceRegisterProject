<template>
    <div v-if="isAuthenticated == false" class="topbar px-4 d-flex justify-content-between justify-content-md-end">
        <router-link to="/login" class="mx-3">Login</router-link>
        <router-link to="/register" class="mx-3">Register</router-link>
    </div>
    <div v-else class="topbar px-4 d-flex justify-content-between justify-content-md-end">
        <a class="mx-3 text-black text-decoration-none">Hello {{username}}</a>
        <a class="mx-3" style="cursor: pointer;" @click="handleLogout">Logout</a>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'LoginDisplay',
        computed: {
            ...mapGetters({
                isAuthenticated: 'userModule/isAuthenticated',
                username: 'userModule/username'
            })
        },
        methods: {
            ...mapActions({
                logout: 'userModule/logoutAction'
            }),
            handleLogout() {
                this.logout();
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
.topbar {
    background-color: #f7f7f7;
    border-bottom: 1px solid #d6d5d5;
    justify-content: flex-end;
    height: 3.5rem;
    display: flex;
    align-items: center;
}

@media (min-width: 641px) {
    .topbar {
		position: sticky;
		top: 0;
		z-index: 1;
	}

    .topbar {
		padding-left: 2rem !important;
		padding-right: 1.5rem !important;
	}
}
</style>
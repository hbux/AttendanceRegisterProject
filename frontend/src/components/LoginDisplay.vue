<template>
    <div v-if="isAuthenticated">
        <a class="mx-3 text-black">{{ username }}</a>
        <a href="/logout" class="mx-3">Logout</a>
    </div>
    <div v-else>
        <a href="/login" class="mx-3">Login</a>
        <a href="/register" class="mx-3">Register</a>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'LoginDisplay',
        computed: {
            ...mapGetters({
                isAuthenticated: 'authenticationModule/isAuthenticated',
                username: 'authenticationModule/username'
            })
        }
    }
</script>
<template>
    <div class="container p-4">
        <h1>Home</h1>
        <div v-if="isInStudentRole"></div>
        <div v-if="isInTutorRole">Tutor</div>
        <div v-if="isInAdminRole">admin</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HomePage',
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
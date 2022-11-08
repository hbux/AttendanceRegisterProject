<template>
    <div class="top-row ps-3 navbar navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="">Attendance System</a>
            <button title="Navigation menu" class="navbar-toggler" @click="toggleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </div>
    <div :class="{ collapse: collapseNavMenu }">
        <nav class="flex-column">
            <div class="nav-item px-3">
                <router-link  active-class="active" to="/" class="nav-link">
                    <span class="oi oi-home" aria-hidden="true"></span> Home
                </router-link>
            </div>
            <div v-if="isInStudentRole" class="nav-item px-3">
                <router-link active-class="active" to="/code/register" exact class="nav-link">
                    <span class="oi oi-plus" aria-hidden="true"></span> Register code
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'MainNavigation',
        data() {
            return {
                collapseNavMenu: true
            }
        },
        computed: {
            ...mapGetters({
                isInStudentRole: 'authenticationModule/isInStudentRole',
                isInTutorRole: 'authenticatedModule/isInTutorRole'
            })
        },
        methods: {
            toggleNavbar() {
                this.collapseNavMenu = !this.collapseNavMenu;
            }
        }
    }
</script>

<style scoped>
.navbar-toggler {
    background-color: rgba(255, 255, 255, 0.1);
}

.top-row {
    height: 3.5rem;
    background-color: rgba(0,0,0,0.4);
}

.navbar-brand {
    font-size: 1.1rem;
}

.oi {
    width: 2rem;
    font-size: 1.1rem;
    vertical-align: text-top;
    top: -2px;
}

.nav-item {
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
}

.nav-item:first-of-type {
    padding-top: 1rem;
}

.nav-item:last-of-type {
    padding-bottom: 1rem;
}

.nav-item > a {
    color: #d7d7d7;
    border-radius: 4px;
    height: 3rem;
    display: flex;
    align-items: center;
    line-height: 3rem;
}

.active {
    background-color: rgba(196, 196, 196, 0.25);
    color: white;
}

.nav-item > a:hover {
    background-color: rgba(255,255,255,0.1);
    color: white;
}

.nav-link {
    padding: 0.5em 1em;
}

@media (min-width: 641px) {
    .navbar-toggler {
        display: none;
    }

    .collapse {
        /* Never collapse the sidebar for wide screens */
        display: block !important;
    }
}

</style>
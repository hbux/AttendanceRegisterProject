<template>
    <div class="top-row ps-3 navbar navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="">Attendance System</a>
            <button title="Navigation menu" class="navbar-toggler">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </div>

    <div class="">
        <nav class="flex-column">
            <div class="nav-item px-3">
                <a class="nav-link" href="/">
                    <span class="oi oi-home" aria-hidden="true"></span> Home
                </a>
            </div>

             <div class="nav-item px-3">
                <a class="nav-link" href="/Course">
                    <span class="oi oi-course" ></span> Courses
                </a>
            </div>

             <div class="nav-item px-3">
                <a class="nav-link" href="/Module">
                    <span class="oi oi-module" ></span> Modules
                </a>
            </div>

            
            <div v-if="isInStudentRole" class="nav-item px-3">
                <a class="nav-link" href="/registerCode">
                    <span class="oi oi-plus" aria-hidden="true"></span> Register code
                </a>
            </div>
        </nav>
    </div>


 
   
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'MainNavigation',
        computed: {
            ...mapGetters({
                isInStudentRole: 'authenticationModule/isInStudentRole'
            })
        },
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

.nav-item > a.active {
    background-color: rgba(255,255,255,0.25);
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
        display: block;
    }
}

</style>
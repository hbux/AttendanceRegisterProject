<template>
    <div class="container px-0">
        <div class="container p-4 mx-0">
            <div v-if="errorMessage" class="alert alert-danger fade show" role="alert">
                <strong>Oops!</strong> {{errorMessage}}
            </div>
            <div class="my-4">
                <h5>Active registers</h5>
                <div v-if="activeRegisters.length == 0 && isAuthenticated" class="alert alert-primary my-4" role="alert">
                    No active registers found.
                </div>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div v-for="(register, index) in activeRegisters" :key="index" class="col">
                        <div class="card">
                            <div class="card-header text-center">
                                {{register.module.moduleId}}
                            </div>
                            <div class="card-body">
                                <router-link to="/"><h5 class="card-title">{{register.module.name}}</h5></router-link>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Tutor: <strong>{{register.tutor.firstName}} {{register.tutor.lastName}}</strong></li>
                                <li class="list-group-item">Module leader: <strong>{{register.module.moduleLeader.firstName}} {{register.module.moduleLeader.lastName}}</strong></li>
                                <li class="list-group-item">Students timetabled: <strong>{{register.class.students.length}}</strong></li>
                                <li v-if="register.isActive == true" class="list-group-item">Students registered: <strong>{{register.class.students.filter(s => s.hasRegisted == true).length}}</strong></li>
                            </ul>
                            <div class="card-footer text-muted">
                                {{register.class.startDate}} - {{register.class.duration}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-4">
                <h5>Not yet activated registers</h5>
                <div v-if="inactiveRegisters.length == 0 && isAuthenticated" class="alert alert-primary my-4" role="alert">
                    No inactive registers found.
                </div>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div v-for="(register, index) in inactiveRegisters" :key="index" class="col">
                        <div class="card">
                            <div class="card-header text-center">
                                {{register.module.moduleId}}
                            </div>
                            <div class="card-body">
                                <router-link to="/"><h5 class="card-title">{{register.module.name}}</h5></router-link>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Tutor: <strong>{{register.tutor.firstName}} {{register.tutor.lastName}}</strong></li>
                                <li class="list-group-item">Module leader: <strong>{{register.module.moduleLeader.firstName}} {{register.module.moduleLeader.lastName}}</strong></li>
                                <li class="list-group-item">Students timetabled: <strong>{{register.class.students.length}}</strong></li>
                                <li v-if="register.isActive == true" class="list-group-item">Students registered: <strong>{{register.class.students.filter(s => s.hasRegisted == true).length}}</strong></li>
                            </ul>
                            <div class="card-footer text-muted">
                                {{register.class.startDate}} - {{register.class.duration}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-4">
                <h5>Closed registers</h5>
                <div v-if="closedRegisers.length == 0 && isAuthenticated" class="alert alert-primary my-4" role="alert">
                    No closed registers found.
                </div>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div v-for="(register, index) in closedRegisers" :key="index" class="col">
                        <div class="card">
                            <div class="card-header text-center">
                                {{register.module.moduleId}}
                            </div>
                            <div class="card-body">
                                <router-link to="/"><h5 class="card-title">{{register.module.name}}</h5></router-link>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Tutor: <strong>{{register.tutor.firstName}} {{register.tutor.lastName}}</strong></li>
                                <li class="list-group-item">Module leader: <strong>{{register.module.moduleLeader.firstName}} {{register.module.moduleLeader.lastName}}</strong></li>
                                <li class="list-group-item">Students timetabled: <strong>{{register.class.students.length}}</strong></li>
                                <li v-if="register.isActive == true" class="list-group-item">Students registered: <strong>{{register.class.students.filter(s => s.hasRegisted == true).length}}</strong></li>
                            </ul>
                            <div class="card-footer text-muted">
                                {{register.class.startDate}} - {{register.class.duration}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import registerEndpoint from '../endpoints/registerEndpoint';

export default {
    name: 'PortalPage',
    data() {
        return {
            errorMessage: '',
            activeRegisters: [],
            inactiveRegisters: [],
            closedRegisers: []
        }
    },
    computed: {
        ...mapGetters({
            isAuthenticated: 'userModule/isAuthenticated'
        })
    },
    async created() {
        await registerEndpoint.getRegistersAsync()
            .then(response => {
                let allRegisters = response.data;

                this.activeRegisters = allRegisters.filter(r => r.isActive == true && !r.dateClosed);
                this.inactiveRegisters = allRegisters.filter(r => r.isActive == false && !r.dateClosed);
                this.closedRegisers = allRegisters.filter(r => r.isActive == false && r.dateClosed);
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            })
    }
}
</script>
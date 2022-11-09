<template>
    <div class="container p-4">
        <div v-if="errorMessage" class="alert alert-danger fade show" role="alert">
            <strong>Oops!</strong> {{errorMessage}}
        </div>
        <div class="my-4">
            <div class="mb-4" v-if="isAuthenticated">
                <h3>My Registers</h3>
                <div v-if="registers.length == 0 && isAuthenticated" class="alert alert-primary my-4" role="alert">
                    No registers found.
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div v-for="(register, index) in registers" :key="index" class="col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{register.module.name}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{register.class.startDate}} - {{register.class.duration}}</h6>
                            <p v-if="register.isActive == true" class="card-text">Status: <span class="text-success fw-bold">Active</span></p>
                            <p v-if="register.isActive == false" class="card-text">Status: <span class="text-warning fw-bold">Not active</span></p>
                            <router-link :to="{ name: 'ManagePage', params:{ id: register._id } }" class="btn btn-dark">View register</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import registerService from '../services/registerService';

export default {
    name: 'ManagePage',
    data() {
        return {
            errorMessage: '',
            registers: []
        }
    },
    computed: {
        ...mapGetters({
            isAuthenticated: 'userModule/isAuthenticated'
        })
    },
    async created() {
        await registerService.getRegistersAsync()
            .then(response => {
                this.registers = response.data;
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            })
    }
}
</script>
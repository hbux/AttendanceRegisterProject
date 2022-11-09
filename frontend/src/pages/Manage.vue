<template>
    <div class="nav-item custom-item px-3">
        <router-link active-class="custom-active" class="nav-link custom-link" :to="{ name: 'StaffPage' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
                <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
            </svg>Back to staff portal
        </router-link>
    </div>
    <div class="container px-3">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            <strong>Oops!</strong> {{errorMessage}}
        </div>
        <div class="card">
            <div class="card-header">
                {{register.module.moduleId}}
            </div>
            <div class="card-body">
                <h5 class="card-title">{{register.module.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{register.class.startDate}} {{register.class.duration}}</h6>
                <div v-if="register.isActive == true">
                    <p class="card-text">Status: <span class="text-success fw-bold">Active</span></p>
                    <div class="alert alert-success" role="alert">
                        <strong>Code:</strong> {{register.code}}
                    </div>
                </div>
                <div v-else>
                    <p class="card-text">Status: <span class="text-warning fw-bold">Not active</span></p>
                    <button @click="handleActivation" type="button" class="btn btn-success">Activate register</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container px-3">
        <table class="table table-striped table-hover my-4">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Has registered</th>
                <th scope="col">Mark student as</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in register.class.students" :key="index">
                    <th scope="row">{{index}}</th>
                    <td>{{student.studentId}}</td>
                    <td>{{student.firstName}} {{student.lastName}}</td>
                    <td v-if="student.hasRegistered == true" class="text-success fw-bold">{{student.hasRegistered}}</td>
                    <td v-else class="text-danger fw-bold ">{{student.hasRegistered}}</td>
                    <td>
                        <button v-if="student.hasRegistered == false" type="button" class="btn btn-outline-secondary mx-1">Here</button>
                        <button v-if="student.hasRegistered == true" type="button" class="btn btn-outline-danger mx-1">Absent</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import registerService from '../services/registerService';

export default {
    name: 'ManagePage',
    props: ['id'],
    data() {
        return {
            errorMessage: '',
            register: {

            }
        };
    },
    methods: {
        async handleActivation() {
            await registerService.activateRegisterAsync({
                id: this.register._id
            }).then(response => {
                this.register = response.data;
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            });
        }
    },
    async created() {
        await registerService.getRegisterAsync(this.id)
            .then(response => {
                this.register = response.data;
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            });
    }
}
</script>

<style scoped>
a > svg {
    width: 2rem;
    font-size: 1.1rem;
    vertical-align: text-top;
}

.custom-item {
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
    width: fit-content;
}

.custom-item:first-of-type {
    padding-top: 1rem;
}

.custom-item:last-of-type {
    padding-bottom: 1rem;
}

.custom-item > a {
    color: #515151;
    border-radius: 4px;
    height: 3rem;
    display: flex;
    align-items: center;
    line-height: 3rem;
}

.custom-active {
    background-color: rgba(97, 97, 97, 0.1);
    color: rgb(0, 0, 0);
}

.custom-item > a:hover {
    background-color: rgba(97, 97, 97, 0.1);
    color: rgb(0, 0, 0);
}

.custom-link {
    padding: 0.5em 1em;
}
</style>
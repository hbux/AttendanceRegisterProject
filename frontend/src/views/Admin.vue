<template>
    <form name="form" @submit.prevent="handleRegister">
        <div class="container">
            <div class="mb-4">
                <h2>Register a new user</h2>
            </div>
            <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oops!</strong> {{registerErrorMessage}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> {{registerSuccessMessage}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="form-floating mb-3">
                <input v-model="firstName" type="text" class="form-control" name="firstName" id="floatingFN" placeholder="First Name">
                <label for="floatingFN">First Name</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="lastName" type="text" class="form-control" name="lastName" id="floatingLN" placeholder="Last Name">
                <label for="floatingLN">Last Name</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="email" type="email" class="form-control" name="email" id="floatingE" placeholder="name@example.com">
                <label for="floatingE">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="password" type="password" class="form-control" name="password" id="floatingP" placeholder="Password">
                <label for="floatingP">Password</label>
            </div>
            <div class="form-floating">
                <input v-model="confirmPassword" type="password" class="form-control" name="confirmPassword" id="floatingCP" placeholder="Confirm Password">
                <label for="floatingCP">Confirm password</label>
            </div>
            <div class="my-3">
            <label for="password" class="form-label">Role of user</label>
                <select v-model="selectedRole" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option disabled>Choose a role</option>
                    <option v-for="(role, index) in roles" :key="index">{{role}}</option>
                </select>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-dark btn-large my-3 py-3">
                    <div v-if="isLoading" class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-if="!isLoading" class="text-center">
                        Register
                    </div>
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import roleService from '../services/roleService';
    import { mapActions } from 'vuex';

    export default {
        name: 'AdminPage',
        data() {
            return {
                isLoading: false,
                errorMessage: '',
                successMessage: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                roles: [],
                selectedRole: '',
            };
        },
        methods: {
            ...mapActions({
                register: 'authenticationModule/registerAction',
            }),
            handleRegister() {
                this.isLoading = true;

                this.register({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    roleName: this.selectedRole
                }).then(data => {
                    this.isLoading = false;
                    this.successMessage = data.message;

                    this.firstName = ''
                    this.lastName = '',
                    this.email = '',
                    this.password = '',
                    this.confirmPassword = '',
                    this.selectedRole = ''

                }).catch(error => {
                    this.isLoading = false;
                    this.errorMessage = error.response.data.message;
                }).finally(() => {
                    document.getElementById('alert').scrollIntoView();
                });
            }
        },
        async created() {
            await roleService.getAllAsync()
                .then(response => {
                    this.roles = response.data;
                }).catch(error => {
                    this.registerErrorMessage = error.response.data.message;
                })
        }
    }
</script>
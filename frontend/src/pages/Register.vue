<template>
    <div class="container">
        <form @submit.prevent="handleRegister" class="container my-4" style="max-width: 500px;">
            <div v-if="successMessage" class="alert alert-success" role="alert">
                <strong>Success!</strong> {{successMessage}}
            </div>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                <strong>Oops!</strong> {{errorMessage}}
            </div>
            <div class="card">
                <div class="card-header py-2" style="font-size: 2rem">
                    Register for an account
                </div>
                <div class="card-body row">
                    <div class="mb-3 col-6">
                        <label for="firstName" class="form-label">First name</label>
                        <input v-model="firstName" type="text" name="firstName" class="form-control" id="firstName">
                    </div>
                    <div class="mb-3 col-6">
                        <label for="lastName" class="form-label">Last name</label>
                        <input v-model="lastName" type="text" name="lastName" class="form-control" id="lastName">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input v-model="email" type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3 col-12">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" name="password" class="form-control" id="password">
                    </div>
                    <div class="mb-3 col-12">
                        <label for="confirmPassword" class="form-label">Confirm password</label>
                        <input v-model="confirmPassword" type="password" name="confirmPassword" class="form-control" id="confirmPassword">
                    </div>
                    <div class="my-3">
                        <label for="password" class="form-label">Role of user</label>
                        <select v-model="selectedRoles" multiple class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option disabled>Choose roles</option>
                            <option v-for="(role, index) in roles" :key="index">{{role}}</option>
                        </select>
                    </div>

                    <div class="d-grid gap-2 col-12 mt-2">
                        <button class="btn btn-dark p-3" type="submit">
                            <div v-if="isLoading" class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <div v-else class="text-center">
                                Create account
                            </div>
                        </button>
                    </div>
                </div>
                <div class="card-footer text-muted py-2">
                    Already have an account? <router-link to="/login">Log in</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import userService from '../services/userService';
import roleService from '../services/roleService';

export default {
    name: 'RegisterPage',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            selectedRoles: [],
            roles: [],
            errorMessage: '',
            successMessage: '',
            isLoading: false
        };
    },
    methods: {
        async handleRegister() {
            this.isLoading = true;

            await userService.registerAsync({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
                roles: this.selectedRoles
            }).then(response => {
                this.isLoading = false;
                this.successMessage = response.data.message;

                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.password = '';
                this.confirmPassword = ''
                this.selectedRoles = [];

                this.errorMessage = '';
            }).catch(error => {
                this.isLoading = false;
                this.errorMessage = error.response.data.message;

                this.successMessage = ''
            });
        }
    },
    async created() {
        await roleService.getAllAsync()
            .then(response => {
                this.roles = response.data;
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            })
    }
}
</script>
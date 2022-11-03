<template>
    <form name="form" @submit.prevent="handleRegister">
        <div class="container">
            <div class="mb-4">
                <h2>Register a new user</h2>
            </div>
            <div v-if="registerErrorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oops!</strong> {{registerErrorMessage}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div v-if="registerSuccessMessage" class="alert alert-success alert-dismissible fade show" role="alert">
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
    <hr />
    <form name="form-role" @submit.prevent="handleAddRole">
        <div class="container">
            <div class="mb-4">
                <h2>Add a role to an existing user</h2>
            </div>
            <div v-if="roleErrorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oops!</strong> {{roleErrorMessage}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div v-if="roleSuccessMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> {{roleSuccessMessage}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="form-floating mb-3">
                <input v-model="roleEmail" type="email" class="form-control" name="email" id="floatingE" placeholder="name@example.com">
                <label for="floatingE">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="roleName" type="text" class="form-control" name="roleName" id="floatingP" placeholder="Password">
                <label for="floatingP">Role Name (Student, Admin)</label>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-dark btn-large my-3 py-3">
                    <div v-if="isLoading" class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-if="!isLoading" class="text-center">
                        Add role
                    </div>
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'AdminPage',
        data() {
            return {
                isLoading: false,
                registerErrorMessage: '',
                registerSuccessMessage: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',

                roleErrorMessage: '',
                roleSuccessMessage: '',
                roleEmail: '',
                roleName: ''
            };
        },
        methods: {
            ...mapActions({
                register: 'authenticationModule/registerAction',
                addRole: 'authenticationModule/addRoleAction'
            }),
            handleRegister() {
                this.isLoading = true;

                this.register({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword
                }).then(data => {
                    this.isLoading = false;
                    this.registerSuccessMessage = data.message;

                    this.firstName = ''
                    this.lastName = '',
                    this.email = '',
                    this.password = '',
                    this.confirmPassword =''

                }).catch(error => {
                    this.isLoading = false;
                    this.registerErrorMessage = error.response.data.message;
                });
            },
            handleAddRole() {
                this.isLoading = true;

                this.addRole({
                    email: this.roleEmail,
                    roleName: this.roleName
                }).then(data => {
                    this.isLoading = false;
                    this.roleSuccessMessage = data.message;

                    this.roleEmail = '',
                    this.roleName = ''

                }).catch(error => {
                    this.isLoading = false;
                    this.roleErrorMessage = error.response.data.message;
                });
            }
        }
    }
</script>
<template>
    <form name="form" @submit.prevent="handleLogin">
        <div class="container">
            <div class="mb-4">
                <h2>Please login</h2>
            </div>
            <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oops!</strong> {{errorMessage}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="form-floating mb-3">
                <input v-model="email" type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input v-model="password" type="password" class="form-control" name="password" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-dark btn-large my-3 py-3">
                    <div v-if="isLoading" class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-if="!isLoading" class="text-center">
                        Login
                    </div>
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'LoginPage',
        data() {
            return {
                isLoading: false,
                errorMessage: '',
                email: '',
                password: ''
            };
        },
        methods: {
            ...mapActions({
                login: 'authenticationModule/loginAction'
            }),
            handleLogin() {
                this.isLoading = true;

                this.login({
                    email: this.email,
                    password: this.password
                }).then(() => {
                    this.isLoading = false;
                    this.$router.push('/');
                }).catch(error => {
                    this.isLoading = false;
                    this.errorMessage = error.response.data.message;
                }).finally(() => {
                    document.getElementById('alert').scrollIntoView();
                });
            }
        }
    }
</script>
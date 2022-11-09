<template>
    <div class="container">
        <form @submit.prevent="handleLogin" name="login-form" class="container my-4" style="max-width: 500px;">
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                <strong>Oops!</strong> {{errorMessage}}
            </div>
            <div class="card">
                <div class="card-header py-2" style="font-size: 2rem">
                    Login to your account
                </div>
                <div class="card-body row">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input v-model="email" type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3 col-12">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" name="password" class="form-control" id="password">
                    </div>
                    <div class="d-grid gap-2 col-12 mt-2">
                        <button class="btn btn-dark p-3" type="submit">
                            <div v-if="isLoading" class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <div v-else class="text-center">
                                Login
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            isLoading: false
        };
    },
    methods: {
        ...mapActions({
                login: 'userModule/loginAction'
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
            })
        }
    }
}
</script>
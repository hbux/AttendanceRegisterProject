<template>
    <div class="center-wrapper pop rounded-2 w-75" id="login">
        <!--div class="container bg-warning align-content-center"-->
        <div class="d-flex rounded-2 flex-column flex-md-row align-items-stretch overflow-hidden">
            <div class="login-bg flex-grow-1 d-flex align-content-center justify-content-center">
                <img class="img-fluid" src="~@/assets/login-graphic-1.png">
            </div>
            <div class="m-auto flex-grow-1">
                <div>
                    <form @submit.prevent="handleLogin" name="login-form" class="container my-4"
                        style="max-width: 500px;">
                        <div v-if="errorMessage" class="alert alert-danger" role="alert">
                            <strong>Oops!</strong> {{ errorMessage }}
                        </div>
                        <div class="card border-0">
                            <div class="d-none card-header py-2" style="font-size: 2rem">
                                Login to your account
                            </div>
                            <div class="card-body row">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input v-model="email" type="email" name="email" class="form-control" id="email"
                                        aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="password" class="form-label">Password</label>
                                    <input v-model="password" type="password" name="password" class="form-control"
                                        id="password">
                                </div>
                                <div class="d-grid gap-2 col-12 mt-2">
                                    <button class="btn btn-primary p-3" type="submit">
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
            </div>
        </div>

    </div>
</template>

<style>
.login-bg {
    background-image: url('~@/assets/BG1.png');
    background-size: cover;
    border: inherit;
}

@media screen and (max-width: 768px) {
    .login-bg {
        max-height: 300px;
    }

    .login-bg img {
        max-width: 300px;
    }
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'LoginPage',
    computed: {
        ...mapGetters({
            isAuthenticated: 'userModule/isAuthenticated',
            username: 'userModule/username',
            isInStudentRole: 'userModule/isInStudentRole',
            isInTutorRole: 'userModule/isInTutorRole',
            isInAdminRole: 'userModule/isInAdminRole'
        })
    },
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
                if (this.isInStudentRole)
                    this.$router.push('/checkin');
                else if (this.isInTutorRole)
                    this.$router.push('/staff');
                else if (this.isInAdminRole)
                    this.$router.push('/admin');
                else
                    this.$router.push('/');
            }).catch(error => {
                this.isLoading = false;
                this.errorMessage = error.response.data.message;
            })
        }
    }
}
</script>
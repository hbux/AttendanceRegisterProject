<template>
    <div class="t-1 mt-sm-4 d-flex flex-column justify-content-center">

        <img class="mx-auto img-fluid" src="~@/assets/graphic-3.png">
        <div class="container">
            <form @submit.prevent="handleCode" name="login-form" class="p-0 container my-4" style="max-width: 500px;">
                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                    <strong>Oops!</strong> {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="alert alert-success" role="alert">
                    <strong>Success!</strong> {{ successMessage }}
                </div>
                <div class="card">
                    <div class="d-none card-header py-2" style="font-size: 2rem">
                        Enter a registration code
                    </div>
                    <div class="card-body row">
                        <div class="mb-3 col-12">
                            <!--label for="code" class="form-label">Registration code</label-->
                            <input v-model="code" type="text" name="password" class="form-control p-3" id="code"
                                placeholder="Registration Code.." required>
                            <div id="codeHelpBlock" class="form-text ps-3">
                                Registration code can only contain numbers
                            </div>
                        </div>
                        <div class="d-grid gap-2 col-12 mt-2">
                            <button class="btn btn-outline-dark p-3" type="submit">
                                <div v-if="isLoading" class="spinner-border text-light" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div v-else class="text-center">
                                    Register attendance
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import attendanceService from '../services/attendanceService';

export default {
    name: 'CodePage',
    data() {
        return {
            code: '',
            errorMessage: '',
            successMessage: '',
            isLoading: false
        }
    },
    methods: {
        async handleCode() {
            this.isLoading = true;

            await attendanceService.registerCodeAsync({
                code: this.code
            }).then(response => {
                this.isLoading = false;
                this.code = '';
                this.errorMessage = '',
                    this.successMessage = response.data.message;
            }).catch(error => {
                this.isLoading = false;
                this.code = '';
                this.errorMessage = error.response.data.message;
            });
        }
    }
}
</script>
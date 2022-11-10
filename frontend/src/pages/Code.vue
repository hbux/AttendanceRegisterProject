<template>
    <div class="container">
        <form @submit.prevent="handleCode" name="login-form" class="container my-4" style="max-width: 500px;">
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                <strong>Oops!</strong> {{errorMessage}}
            </div>
            <div v-if="successMessage" class="alert alert-success" role="alert">
                <strong>Success!</strong> {{successMessage}}
            </div>
            <div class="card">
                <div class="card-header py-2" style="font-size: 2rem">
                    Enter a registration code
                </div>
                <div class="card-body row">
                    <div class="mb-3 col-12">
                        <label for="code" class="form-label">Registration code</label>
                        <input v-model="code" type="text" name="password" class="form-control" id="code">
                        <div id="codeHelpBlock" class="form-text">
                            This is the lesson's attendance/registration code. Usually in the format of 8882.
                        </div>
                    </div>
                    <div class="d-grid gap-2 col-12 mt-2">
                        <button class="btn btn-dark p-3" type="submit">
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
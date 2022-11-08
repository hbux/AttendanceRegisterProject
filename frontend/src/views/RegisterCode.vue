<template>
    <div class="mb-4">
        <h2>Register your attendance.</h2>
    </div>
    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success!</strong> {{successMessage}}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Oops!</strong> {{errorMessage}}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <form @submit.prevent="handleRegisterCode">
        <label for="code" class="form-label">Registration code</label>
        <input v-model="code" type="text" id="code" name="code" class="form-control" aria-describedby="codeHelpBlock">
        <div id="codeHelpBlock" class="form-text">
            This is the lesson's attendance/registration code. Usually in the format of 8882.
        </div>
        <button type="submit" class="btn btn-dark my-2">Submit</button>
    </form>
</template>

<script>
    import registerService from '../services/registerService';

    export default {
        name: 'RegisterCode',
        data() {
            return {
                code: '',

                errorMessage: '',
                successMessage: '',
                isLoading: false
            }
        },
        methods: {
            async handleRegisterCode() {
                this.isLoading = true;

                await registerService.registerCodeAsync({
                    code: this.code
                }).then(() => {
                    this.isLoading = false;
                    this.code = '';
                    this.errorMessage = ''
                }).catch(error => {
                    this.isLoading = false;
                    this.code = '';
                    this.errorMessage = error.response.data.message;
                });
            }
        }
    }
</script>
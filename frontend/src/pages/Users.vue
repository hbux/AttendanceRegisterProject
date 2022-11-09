<template>
    <div class="container my-4">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            <strong>Oops!</strong> {{errorMessage}}
        </div>
        <div v-if="successMessage" class="alert alert-success" role="alert">
            <strong>Success!</strong> {{successMessage}}
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-hover my-4">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Roles</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in allUsers" :key="index">
                        <th scope="row">{{index}}</th>
                        <td>{{user.email}}</td>
                        <td>
                            <p v-for="(role, i) in user.roles" :key="i">{{role}}</p>
                        </td>
                        <td>
                            <div class="d-flex">
                                <button type="button" @click="setCurrentUser(index)" class="btn btn-outline-secondary mx-1"  data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Edit</button>
                                <button type="button" @click="setCurrentUser(index)" class="btn btn-outline-danger mx-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop4">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
        <div class="modal-dialog">
            <form>
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel1">Edit</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-3 mb-5">
                            <div class="col-sm-6">
                                <label for="firstName" class="form-label">First name</label>
                                <input v-model="modal.firstName" type="text" class="form-control" id="firstName">
                            </div>
                            <div class="col-sm-6">
                                <label for="lastName" class="form-label">Last name</label>
                                <input v-model="modal.lastName" type="text" class="form-control" id="lastName">
                            </div>
                            <div class="col-12">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="modal.email" type="email" class="form-control" id="lastName">
                            </div>
                            <div class="col-12">
                                <label for="password" class="form-label">Role of user</label>
                                <select v-model="modal.selectedRoles" multiple class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                    <option disabled>Choose roles</option>
                                    <option v-for="(role, index) in roles" :key="index">{{role}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</a>
                        <button @click="handleUpdateUser" type="button" class="btn btn-dark">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel4" aria-hidden="true">
        <div class="modal-dialog">
            <form>
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel4">Delete confirmation</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-3 mb-5">
                            <div class="col-sm-6">
                                <label for="firstName" class="form-label">First name</label>
                                <input v-model="modal.firstName" type="text" class="form-control" id="firstName" disabled>
                            </div>
                            <div class="col-sm-6">
                                <label for="lastName" class="form-label">Last name</label>
                                <input v-model="modal.lastName" type="text" class="form-control" id="lastName" disabled>
                            </div>
                            <div class="col-12">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="modal.email" type="email" class="form-control" id="lastName" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</a>
                        <button @click="handleDeleteUser" type="button" class="btn btn-danger">
                            Delete user
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import userService from '../services/userService';
import roleService from '../services/roleService';

export default {
    name: 'UsersPage',
    data() {
        return {
            allUsers: [],
            errorMessage: '',
            successMessage: '',
            roles: [],

            modal: {
                _id: '',
                firstName: '',
                lastName: '',
                email: '',
                selectedRoles: []
            }
        };
    },
    methods: {
        setCurrentUser(index) {
            this.modal = this.allUsers[index];
        },
        async handleUpdateUser() {
            await userService.updateUser({
                id: this.modal._id,
                firstName: this.modal.firstName,
                lastName: this.modal.lastName,
                email: this.modal.email,
                roles: this.modal.selectedRoles
            }).then(() => {
                this.successMessage = 'User updated succesfully.';
                this.errorMessage = '';
            }).catch(error => {
                this.errorMessage = error.response.data.message;
                this.successMessage = '';
            })
        },
        async handleDeleteUser() {
            await userService.deleteUser({
                id: this.modal._id
            }).then(response => {
                console.log(response);
                this.allUsers.pop(u => u._id == this.modal.id);
                this.successMessage = response.data.message;
                this.errorMessage = '';
            }).catch(error => {
                console.log(error);
                this.errorMessage = error.response.data.message;
                this.successMessage = '';
            });
        }
    },
    async created() {
        await userService.getAllAsync()
            .then(response => {
                this.allUsers = response.data;
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            });

        await roleService.getAllAsync()
            .then(response => {
                this.roles = response.data;
            }).catch(error => {
                this.errorMessage = error.response.data.message;
            });
    }
}
</script>
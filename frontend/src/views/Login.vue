<template>
    <form>
        <div class="container">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oops!</strong> An error occured logging you in.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" name="" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-dark btn-large my-3 py-3">Login</button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'LoginPage'
    }
</script>
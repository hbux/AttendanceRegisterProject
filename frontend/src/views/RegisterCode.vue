<template>
    <div class="mb-4">
        <h2>Register your attendance.</h2>
    </div>
    <!-- <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success!</strong> Your registration has been submitted.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Oops!</strong> An error occured with your registration code.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> -->
    <form>
        <label for="code" class="form-label">Registration code</label>
        <input type="text" id="code" name="code" class="form-control" aria-describedby="codeHelpBlock">
        <div id="codeHelpBlock" class="form-text">
            This is the lesson's attendance/registration code. Usually in the format of 8882.
        </div>
        <button type="submit" class="btn btn-dark my-2">Submit</button>
    </form>
</template>

<script>
    export default {
        name: 'RegisterCode'
    }
</script>
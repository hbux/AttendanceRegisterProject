<template>
    <h1>Hello, world!</h1>
    <p class="py-2">Welcome to your new app.</p>
    <div class="alert alert-warning" role="alert">
        This is just a temporary alert to demonstrate functionality.
    </div>
    <div class="alert alert-secondary mt-4">
        <span class="oi oi-pencil me-2" aria-hidden="true"></span>
        <strong>Survey prompt</strong>

        <span class="text-nowrap">
            Please take our
            <a target="_blank" class="font-weight-bold link-dark" href="https://go.microsoft.com/fwlink/?linkid=2148851">brief survey</a>
        </span>
        and tell us what you think.
</div>
</template>

<script>
    export default {
        name: "HomePage"
    }
</script>
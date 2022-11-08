<template>
	<div class="page">
		<div class="sidebar">
			<nav class="navbar px-3">
				<div class="container">
					<router-link class="navbar-brand" to="/">
						<img src="./assets/logo.png" alt="Attendance Register" width="30" height="24">
					</router-link>
					<button title="Navigation menu" class="navbar-toggler" @click="toggleNavMenu">
						<span class="navbar-toggler-icon"></span>
					</button>
				</div>
			</nav>
			<div :class="{ collapse: collapseNavMenu }">
				<nav class="flex-column">
					<div class="nav-item px-3">
						<router-link active-class="active" class="nav-link" to="/">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
								<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"></path>
							</svg>Home
						</router-link>
					</div>
					<div class="nav-item px-3">
						<router-link active-class="active" class="nav-link" to="/code">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-code-fill" viewBox="0 0 16 16">
								<path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 1 1 .708-.708z"/>
							</svg>Registration Code
						</router-link>
					</div>
					<div class="nav-item px-3">
						<router-link active-class="active" class="nav-link" to="/portal">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-kanban-fill" viewBox="0 0 16 16">
								<path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
							</svg>Staff Portal
						</router-link>
					</div>
				</nav>
			</div>
		</div>
		<main id="alert">
			<LoginDisplay></LoginDisplay>
			<div class="content">
				<router-view></router-view>
			</div>
		</main>
	</div>
</template>

<script>
import LoginDisplay from './components/LoginDisplay.vue';

export default {
    name: "App",
	components: {
		LoginDisplay
	},
	data() {
		return {
			collapseNavMenu: true
		}
	},
	methods: {
		toggleNavMenu() {
			this.collapseNavMenu = !this.collapseNavMenu;
		}
	}
}
</script>

<style scoped>
.page {
    position: relative;
    display: flex;
    flex-direction: column;
}

.navbar {
	background-color: #ebebeb;
}

.sidebar {
	background-color: #ebebeb;
}

main {
	flex: 1;
}

a > svg {
    width: 3rem;
    font-size: 1.1rem;
    vertical-align: text-top;
}

.nav-item {
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
}

.nav-item:first-of-type {
    padding-top: 1rem;
}

.nav-item:last-of-type {
    padding-bottom: 1rem;
}

.nav-item > a {
    color: #515151;
    border-radius: 4px;
    height: 3rem;
    display: flex;
    align-items: center;
    line-height: 3rem;
}

.active {
    background-color: rgba(97, 97, 97, 0.1);
    color: rgb(0, 0, 0);
}

.nav-item > a:hover {
    background-color: rgba(97, 97, 97, 0.1);
    color: rgb(0, 0, 0);
}

.nav-link {
    padding: 0.5em 1em;
}

.content {
    position: relative;
    display: flex;
    flex-direction: column;
}


@media (min-width: 641px) {
	.page {
		flex-direction: row;
	}

	.sidebar {
		width: 250px;
		min-height: 100vh;
		border-right: 1px solid #d6d5d5;
	}

	.navbar-toggler {
		display: none;
	}

	.collapse {
		/* Never collapse the sidebar for wide screens */
		display: block !important;
	}
}

@media (min-width: 1000px) {
	.content {
		flex-direction: row;
	}
}
</style>
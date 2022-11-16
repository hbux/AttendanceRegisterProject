<template>
	<nav class="navbar pop primary sticky-top px-2 pb-3">
		<div class="container-fluid fw-bold">

			<a class="navbar-brand d-none d-sm-block">University of Professional
				Sciences</a>
			<a class="navbar-brand ml-auto" href="/checkin">Attendance</a>
			<button title="Navigation menu" class="navbar-toggler" @click="toggleNavMenu">
				<span class="navbar-dark navbar-toggler-icon"></span>
			</button>

		</div>
	</nav>
	<div class="view">
		<div id="sidebar-container" :class="{ collapse: collapseNavMenu }">
			<div class="sidebar bg-light">
				<nav class="flex-column">
					<MainNavigation />
				</nav>
			</div>
		</div>
		<div id="alert" class="content-container">
			<div class="content mt-3">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import MainNavigation from './components/MainNavigation.vue';

export default {
	name: 'App',
	components: {
		MainNavigation
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
.pop {
	box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
}

nav.pop {
	box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.25);
}

.primary {
	background-color: #621b40 !important;
	color: white !important;
}

.primary * {
	color: white !important;
}

.center-wrapper {
	width: fit-content;
	position: relative;
	top: 50%;
	left: 50%;
	/* bring your own prefixes */
	transform: translate(-50%, -25%);
}

.cw-small {
	transform: translate(-50%, -0%);
}

@media screen and (max-width: 768px) {
	.center-wrapper {
		margin-top: 20px;
		width: 90% !important;
	}

	.center-wrapper#login {
		transform: translate(-50%, -50%);
	}
}

@media screen and (max-width: 640px) {

	.center-wrapper {
		margin-top: 20px;
		width: 90% !important;
		transform: translate(-50%, +50%);
	}

	.center-wrapper#login {
		transform: translate(-50%, 0%);
	}


}


.view {
	position: relative;
	display: flex;
	flex-direction: column;
}

.content-container {
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
}

@media (min-width: 641px) {
	.view {
		flex-direction: row;
	}

	.sidebar-container {
		min-height: 100vh;
	}

	.sidebar {
		width: 250px;
		min-height: 100vh;
		height: 100%;
		border-right: 1px solid #d6d5d5;
	}

	.navbar-toggler {
		display: none;
	}

	.collapse {
		display: block !important;
	}
}

@media (min-width: 1000px) {
	.content {
		flex-direction: row;
	}
}
</style>
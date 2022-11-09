<template>
	<nav class="navbar bg-light sticky-top border-bottom px-2">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Attendance Registration</a>
			<button title="Navigation menu" class="navbar-toggler" @click="toggleNavMenu">
				<span class="navbar-toggler-icon"></span>
			</button>
		</div>
	</nav>
	<div class="view">
		<div :class="{ collapse: collapseNavMenu }">
			<div class="sidebar bg-light">
				<nav class="flex-column">
					<MainNavigation />
				</nav>
			</div>
		</div>
		<div id="alert" class="content-container">
			<div class="content">
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

	.sidebar {
		width: 250px;
		min-height: calc(100vh - 3.6rem);
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
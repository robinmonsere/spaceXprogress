<script>
	import Header from './Header.svelte';
	import './reset.css';
	import './styles.css';

</script>

<div class="app">
		<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}


</style>

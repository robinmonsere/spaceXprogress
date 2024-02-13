<script>
	import "../app.pcss";
    import './reset.css';
    import './styles.css';
	import logo from "$lib/images/sxlogo.png";

</script>

<div class="app">
	<slot></slot>
	<footer>
		<img src="{logo}" alt="">
		<div id="footer_bar"></div>
		<h3>ONLY THE PARANOID SURVIVE</h3>
	</footer>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		max-height: 100vh;
		justify-content: space-between;

		footer {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 2rem;
			#footer_bar {
				background: white;
				height: 2px;
				width: 95vw;
				margin: 2rem;
			}
			img {
				width: 8rem;
				padding: 0;
				margin: 0;
			}
			h3 {
				font-weight: bold;
				font-size: 2rem;
				word-spacing: 0.5rem;
			}
		}
	}
</style>

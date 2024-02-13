<script>
	export let data;
	let total = data.F9 + data.FH + data.Starship;
	let year = new Date().getFullYear();
	import { Progressbar } from 'flowbite-svelte';
	import logo from '$lib/images/sxlogo.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<h1>SpaceX {year} progress</h1>
	<div>
		<p><i>🚀</i><span>{data.F9}</span>x Falcon 9</p>
		<p><i>🚀</i><span>{data.FH}</span>x Falcon Heavy</p>
		<p><i>🚀</i><span>{data.Starship}</span>x Starship</p>
		<p><i>🐉</i><span>{data.Crew + data.Cargo}</span>x Dragon (<span>{data.Crew}</span>x <i>🧑‍🚀‍</i>, <span>{data.Cargo}</span>x <i>📦</i>)</p>
		<p><i>🛰️</i><span>--</span>x Starlink</p>
	</div>

	<div class="progress">

		<div id="progress_bar">
			<Progressbar  size="h-16" progress={(total/148) * 100}/>
		</div>
		<div>
			<h2>{total}/148</h2>
		</div>
	</div>

</main>



<style lang="scss">
	h1	{
		font-weight: bolder;
		font-size: 3rem;
	}
	main {
		display: flex;
		flex-direction: column;
		margin-top: 2rem;
		align-items: center;
		gap: 2rem;
		flex: 0.6;
	}
	p {
		font-size: 2rem;
		line-height: 1.5;
	}

	.progress {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		width: 80%;
		h2 {
			font-size: 4rem;
		}
		#progress_bar {
			width: 100%;
		}
	}



</style>

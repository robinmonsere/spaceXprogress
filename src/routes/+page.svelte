<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	export let data;
	console.log(data);
	let year = new Date().getFullYear();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<h1>SpaceX 2024 progress</h1>
	<div>
		<p><i>🚀</i><span>{data.F9}</span>x Falcon 9</p>
		<p><i>🚀</i><span>{data.FH}</span>x Falcon Heavy</p>
		<p><i>🚀</i><span>{data.Starship}</span>x Starship</p>
		<p><i>🐉</i><span>{data.Crew + data.Cargo}</span>x Dragon (<span>{data.Crew}</span>x <i>🧑‍🚀‍</i>, <span>{data.Cargo}</span>x <i>📦</i>)</p>
		<p><i>🛰️</i><span>--</span>x Starlink</p>
	</div>


</main>


<style>
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

</style>

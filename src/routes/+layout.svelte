<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">

	<main class="bg-white p-4 rounded-md grid gap-4">
		{@render children()}
	</main>
</div>

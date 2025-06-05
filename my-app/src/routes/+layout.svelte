<script>
	import "../app.css";
	let { children } = $props();
</script>

<div class="relative overflow-hidden h-screen">
	<div class="relative flex justify-center">
		{@render children()}
	</div>
</div>

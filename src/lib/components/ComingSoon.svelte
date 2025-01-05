<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<div class="flex flex-col items-center justify-center space-y-4 py-16 text-center">
	<svg class="h-24 w-24 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
	<h2 class="text-2xl font-bold">{m.coming_soon_title()}</h2>
	<p class="max-w-md text-muted-foreground">
		{m.coming_soon_description()}
	</p>
</div>

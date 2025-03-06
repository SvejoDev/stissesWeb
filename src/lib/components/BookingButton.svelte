<script lang="ts">
	export let bookingLink: string;
	export let sticky = false;
</script>

{#if sticky}
	<div class="fixed bottom-8 right-8 z-50">
		<a
			href={bookingLink}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-block rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
		>
			Boka nu
		</a>
	</div>
{:else}
	<a
		href={bookingLink}
		target="_blank"
		rel="noopener noreferrer"
		class="inline-block rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
	>
		Boka nu
	</a>
{/if}

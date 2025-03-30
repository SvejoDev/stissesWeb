<script lang="ts">
	import type { JobRole } from '$lib/types';
	import * as m from '$lib/paraglide/messages';

	export let role: JobRole;
</script>

<div class="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-2xl font-bold text-gray-900">
			{role.title()}
		</h2>
		{#if role.filled}
			<span
				class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
			>
				{m.less_actual_bird_pat()}
			</span>
		{/if}
	</div>
	<div class="prose prose-lg max-w-none">
		<p class="text-gray-600">
			{role.description()}
		</p>
	</div>
</div>

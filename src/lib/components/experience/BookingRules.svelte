<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	export let rules: (string | (() => string))[];

	function getValue(value: string | (() => string)): string {
		return typeof value === 'function' ? value() : value;
	}
</script>

<div class=" rounded-lg bg-gray-50 p-6">
	<h2 class="mb-4 text-xl font-semibold">{m.booking_rules_title()}</h2>
	<ul class="space-y-2">
		{#each rules as rule}
			<li class="flex items-start gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="text-gray-700">{getValue(rule)}</span>
			</li>
		{/each}
	</ul>
</div>

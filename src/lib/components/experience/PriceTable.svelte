<script lang="ts">
	import type { PriceTable } from '$lib/types';
	import * as m from '$lib/paraglide/messages';

	export let priceData: PriceTable;

	function getValue(value: string | (() => string)): string {
		return typeof value === 'function' ? value() : value;
	}
</script>

<div class="mb-8 overflow-x-auto">
	<table class="min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr>
				{#each priceData.headers as header}
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
					>
						{getValue(header)}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200 bg-white">
			{#each priceData.rows as row}
				<tr>
					{#if row.start}
						<td class="whitespace-nowrap px-6 py-4">{getValue(row.start)}</td>
					{/if}
					{#if row.goal}
						<td class="whitespace-nowrap px-6 py-4">{getValue(row.goal)}</td>
					{/if}
					{#if row.duration}
						<td class="whitespace-nowrap px-6 py-4">{getValue(row.duration)}</td>
					{/if}
					{#if row.nights !== undefined}
						<td class="whitespace-nowrap px-6 py-4">{row.nights}</td>
					{/if}
					{#if row.paddleTime}
						<td class="whitespace-nowrap px-6 py-4">{getValue(row.paddleTime)}</td>
					{/if}
					<td class="whitespace-nowrap px-6 py-4 font-medium">{row.price} kr</td>
					{#if row.reducedPrice !== undefined}
						<td class="whitespace-nowrap px-6 py-4 font-medium">{row.reducedPrice} kr</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

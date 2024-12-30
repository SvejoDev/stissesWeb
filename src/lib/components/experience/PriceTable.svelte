<script lang="ts">
    import type { PriceTable } from '$lib/types';
    
    export let priceData: PriceTable;
</script>

<div class="overflow-x-auto mb-8">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                {#each priceData.headers as header}
                    <th 
                        scope="col" 
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        {header}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#each priceData.rows as row}
                <tr class="hover:bg-gray-50">
                    {#each Object.values(row) as value}
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {typeof value === 'number' ? `${value} kr` : value}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
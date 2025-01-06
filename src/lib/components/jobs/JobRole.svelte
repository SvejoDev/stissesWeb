<script lang="ts">
  import type { JobRole } from '$lib/types';
  
  export let role: JobRole;
</script>

<div class="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
  <h2 class="mb-4 text-2xl font-bold text-gray-900">
    {role.title()}
  </h2>
  <div class="prose prose-lg max-w-none">
    <p class="text-gray-600">
      {role.description()}
    </p>
  </div>
</div>
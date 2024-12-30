<script lang="ts">
	import ActivityLayout from '$lib/components/ActivityLayout.svelte';
	import { activities } from '$lib/data/activities';

	const paddlingData = activities.paddla;
</script>

<ActivityLayout
	title={paddlingData.title}
	description={paddlingData.description}
	heroImage={paddlingData.heroImage}
	experiences={paddlingData.experiences}
/>

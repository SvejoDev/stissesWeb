<script lang="ts">
	import ActivityLayout from '$lib/components/ActivityLayout.svelte';
	import { activities } from '$lib/data/activities';

	const activityData = activities.paddla;
</script>

<ActivityLayout activity={activityData} imagePosition="bottom" />
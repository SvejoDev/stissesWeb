<script lang="ts">
	import ActivityLayout from '$lib/components/ActivityLayout.svelte';
	import { activities } from '$lib/data/activities';

	const activityData = activities.cykla;
</script>

<ActivityLayout activity={activityData} />

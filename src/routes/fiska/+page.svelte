<script lang="ts">
  import ActivityLayout from '$lib/components/ActivityLayout.svelte';
  import { activities } from '$lib/data/activities';

  const activityData = activities.fiska;
</script>

<ActivityLayout activity={activityData} imagePosition="top"/>
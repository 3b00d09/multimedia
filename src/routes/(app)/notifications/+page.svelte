<script lang="ts">
    import Notification from "$lib/components/notification/Notification.svelte"
    export let data;

</script>

{#each data.notifications as notification}
    <Notification {notification}/>
{/each}
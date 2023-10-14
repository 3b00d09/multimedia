<script lang="ts">

    export let data;
</script>

<div>
    {#each data.data as post}
        {post.content}
    {/each}
</div>
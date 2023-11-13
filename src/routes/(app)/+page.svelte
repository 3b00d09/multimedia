<script lang="ts">
    export let data;
    import Post from "$lib/components/Post.svelte";
</script>
<div>
    <Post/>
    {#if data}
        {#each data.data as post}
            <div class="post">
                {post.author}
                {post.content}
                {post.timestamp}
            </div>
        {/each}

    {/if}
</div>

<style>
    .post {
        background-color: #333;
        width: 50%;
        padding: 1rem;
        margin-bottom: 1rem;
    }
</style>
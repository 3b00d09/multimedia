<script lang="ts">
    export let data;
    import Linebreak from "$lib/components/Linebreak.svelte";
    import Post from "$lib/components/Post.svelte";
    import PostForm from "$lib/components/PostForm.svelte";

</script>
<div>
    <PostForm />
    {#if data}
        <div class="posts-container">
            {#each data.res as post}
                <Post post={post}/>
                <Linebreak/>
            {/each}
        </div>
    {/if}

</div>

<style>

    div{
        justify-self: center;
    }

    .posts-container{
        display: grid;
        gap: 1rem;
    }
</style>
<script lang="ts">
  import Categories from "$lib/components/Categories.svelte";
  import Linebreak from "$lib/components/Linebreak.svelte";
  import Post from "$lib/components/post/Post.svelte";

    export let data;
</script>

<div>
    {#if data.groups}
        <Categories groups={data.groups}/>
    {/if}   
     
    {#if data.posts}

        <div class="posts-container">
            {#each data.posts as post}
                <Post post={post}/>
                <Linebreak/>
            {/each}
        </div>

    {/if}
</div>

<style>
    .posts-container{
        display: grid;
        gap: 1rem;
    }
</style>
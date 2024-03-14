<script lang="ts">
  import Linebreak from "$lib/components/Linebreak.svelte";
  import Post from "$lib/components/post/Post.svelte";
  import Search from "$lib/components/search/Search.svelte";
  export let data;


</script>

<Search />
{#if data.allPosts && data.allPosts.length > 0}
  <div class="grid">
    {#each data.allPosts as post}
        <Post {post} />
        <Linebreak/>
    {/each}
  </div>
{:else}
  <p>No posts found.</p>
{/if}

<style> 
  .grid {
    display: grid;
    gap: 20px;
    padding: 1rem 0;
  }
</style>

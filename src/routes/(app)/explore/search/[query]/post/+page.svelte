<script lang="ts">
  export let data;
  import PostCard from "$lib/components/search/PostCard.svelte";
  import SearchResult from "$lib/components/search/SearchResult.svelte";
</script>

<SearchResult/>
<div class="posts-container">
  {#each data.allPosts as post}
    <PostCard {post} />
  {/each}
</div>

<style>
  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

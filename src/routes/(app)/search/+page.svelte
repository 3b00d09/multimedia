<script lang="ts">
  export let data: { allUsers: any[]; allPosts: any[] };

  import UserCardTwo from "$lib/components/search/UserCard2.svelte";
  import PostCard from "$lib/components/search/PostCard.svelte";
</script>

<div class="users-scroll-container">
  {#each data.allUsers as user}
    <UserCardTwo {user} />
  {/each}
</div>


<div class="posts-container">
  {#each data.allPosts as post}
    <PostCard {post} />
  {/each}
</div>

<style>
  .users-scroll-container {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding: 1rem 0;
    scrollbar-color: var(--color-primary) var(--color-background);
    width: 100%; 
  }

  .users-scroll-container::-webkit-scrollbar {
    height: 8px;
  }

  .users-scroll-container::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    border-radius: 1rem;
  }

  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

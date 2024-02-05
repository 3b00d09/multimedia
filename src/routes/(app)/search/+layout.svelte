<script>
  import { onMount } from "svelte";
  export let data;

  import PostCard from "$lib/components/search/PostCard.svelte";
  import UserCard from "$lib/components/search/UserCard.svelte";
  import Search from "$lib/components/search/Search.svelte";

  let searchTerm = "";
  /**
   * @type {any[]}
   */
  let filteredPosts = [];
  /**
   * @type {any[]}
   */
  let filteredUsers = [];
  let searchPerformed = false;

  function filterData() {
    searchPerformed = true;

    if (!searchTerm.trim()) {
      filteredPosts = [];
      filteredUsers = [];
    } else {
      filteredUsers = data.allUsers.filter((user) =>
        user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      filteredPosts = data.allPosts.filter((post) =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  /**
   * @param {{ key: string; }} event
   */
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      filterData();
    }
  }
</script>

<main>
  <Search />
  <div class="main container">
    <div class="container">
  

      {#if searchPerformed}
        <div>
          <h2>Filtered Users</h2>
          {#each filteredUsers as user}
            <UserCard {user} />
          {/each}
          <h2>Filtered Posts</h2>
          {#each filteredPosts as post (post.id)}
            <PostCard {post} />
          {/each}
        </div>
   
      {/if}
      <slot />
    </div>
  </div>
</main>
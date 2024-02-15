<script lang="ts">
  export let data;
  import PostCard from "$lib/components/search/PostCard.svelte";
  import Search from "$lib/components/search/Search.svelte";


  let startIndex = 0;
  const usersToShow = 3; 


  $: disableLeft = startIndex <= 0;


  $: disableRight = startIndex + usersToShow >= data.allUsers.length;

  function moveRight() {
    if (!disableRight) startIndex += 1;
  }

  function moveLeft() {
    if (!disableLeft) startIndex -= 1;
  }

  $: visibleUsers = data.allUsers.slice(startIndex, startIndex + usersToShow);
</script>

<Search />
<div class="container">
  <button 
    class="navigation-button left" 
    on:click={moveLeft}
    disabled={disableLeft}
  >&lt;</button>

  <div class="grid">
    {#each visibleUsers as user (user.username)}
      <div class="user" style="background-image: url({user.backgroungimg});">
        <div class="info">
          <img src={user.imageUrl} alt="{user.username}'s profile picture" />
          <p>{user.username}</p>
          <p class="bio">{user.bio}</p>
        </div>
      </div>
    {/each}
  </div>

  <button 
    class="navigation-button right" 
    on:click={moveRight}
    disabled={disableRight}
  >&gt;</button>
</div>

{#if data.allUsers.length === 0}
  <p>No users found.</p>
{/if}

<div class="posts-container">
  {#each data.allPosts as post}

    <PostCard {post} />

  {/each}
</div>

<style>
.container {
  display: flex;
  align-items: center;
  gap: 1rem; 
  width: 100%;
}

.grid {
  display: grid;
  gap: 0.3rem;
  grid-auto-flow: column;
  grid-auto-columns: minmax(10rem, 1fr); 
  overflow-x: hidden; 
  padding: 0.3rem 0;
  grid-template-rows: min-content;
}

.user {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.3rem;
  border-radius: 0.75rem; 
  background-size: cover;
  background-position: center;
  height: 120px; 
  position: relative;
  overflow: hidden;
}

.user:hover,
.user:focus {
  transform: translateY(-5px);
  box-shadow:
    0 8px 10px -5px rgba(0, 0, 0, 0.1),
    0 3px 5px -2px rgba(0, 0, 0, 0.1); 
}

.info {
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  justify-content: center; 
  background: rgba(5, 5, 5, 0.8);
  border-radius: 0.75rem; 
  padding: 0.5rem; 
  gap: 5px; 
}

img {
  width: 1.8rem; 
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  align-self: center; 
}

p {
  color: white;
  margin: 0;
  font-size: 0.6rem; 
}

.bio {
  color: rgba(255, 255, 255, 0.7); 
  font-size: 0.7rem;
  max-width: 100%; 
  word-wrap: break-word; 
}

.navigation-button {
  cursor: pointer; 
  padding: 0.25rem 0.5rem;
}

.posts-container {
  display: grid;
  gap: 0.5rem;
  cursor: pointer;
  margin: auto;
  padding: 0.25rem;
  border-radius: 12px;
}

</style>

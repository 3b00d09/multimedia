<script lang="ts">
  export let data;
  import PostCard from "$lib/components/search/PostCard.svelte";
  import Search from "$lib/components/search/Search.svelte";


  let startIndex = 0;
  const usersToShow = 4; 


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
}

.grid {
  display: grid;
  gap: 2rem; 
  grid-auto-flow: column;
  grid-auto-columns: minmax(14rem, 1fr); 
  overflow-x: hidden; 
  padding: 1rem 0;
  grid-template-rows: min-content;
}

.user {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  border-radius: 1rem;
  background-size: cover;
  background-position: center;
  height: 200px; 
  position: relative;
  overflow: hidden;
}

.user:hover,
  .user:focus {
    transform: translateY(-5px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
  
.info {
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  justify-content: center; 
  background: rgba(5, 5, 5, 0.8);
  border-radius: 1rem;
  padding: 1rem; 
  gap: 10px; 
}

img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  align-self: center; 
}

p {
  color: white;
  margin: 0; 
}

.bio {
  color: rgba(255, 255, 255, 0.7); 
  font-size: 0.8rem; 
  max-width: 100%; 
  word-wrap: break-word; 
}

.navigation-button {
  cursor: pointer; 
  padding: 0.5rem 1rem;
}

  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

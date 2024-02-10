<script lang="ts">
  import Linebreak from "$lib/components/Linebreak.svelte";

  
  import SearchResult from "$lib/components/search/SearchResult.svelte";
  export let data;
</script>


<SearchResult/>

{#if data.allUsers && data.allUsers.length > 0}
  <div class="grid">
    {#each data.allUsers as user (user.username)}
      <div class="user" style="background-image: url({user. backgroungimg});">
        <div class="info">
          <img src={user.imageUrl} alt="{user.username}'s profile picture" />
          <p>{user.username}</p>
          <p>{user.bio}</p>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p>No users found.</p>
{/if}

<style>
  .grid {
    display: grid;
    gap: 20px;
    padding: 1rem 0;
  }

  
  .user:hover,
  .user:focus {
    transform: translateY(-5px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
  .user {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem;
    border-radius: 1rem;
    background-size: cover;
    background-position: center;
    height: 200px;
    overflow: hidden;
  }

  .info {
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
    gap: 10px; 
    background: rgba(5, 5, 5, 0.8);
    border-radius: 1rem;
    padding: 0.2rem;
  }

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    padding: 0.1rem;
    object-fit: cover;
  }
  p {
    color: white;
  }
</style>



<script lang="ts">
  import Linebreak from "$lib/components/Linebreak.svelte";
  import Search from "$lib/components/search/Search.svelte";
  export let data;
</script>
<Search />

{#if data.allUsers && data.allUsers.length > 0}
  <div class="grid">
    {#each data.allUsers as user (user.username)}
      <a href={`/users/${user.username}`} class="user-link">
        <div class="user">
          <img src={user.imageUrl} alt="{user.username}'s profile picture" />
          <div class="info">
            {#if user.firstName || user.lastName}
            <div>
              <p class="author-name">
                {`${
                  user.firstName
                    ? user.firstName.concat(
                        " ",
                        user.lastName || ""
                      )
                    : "" + user.lastName
                      ? user.lastName
                      : ""
                }`}
              </p>
              <p class="author-secondary">{"@" + user.username}</p>
            </div>
          {:else}
            <p class="author">{user.username}</p>
          {/if}
          <p class="bio">{user.bio && user.bio.length > 25 ? user.bio.slice(0, 25) + '...' : (user.bio ? user.bio : '')}</p>

            <div class="stats-container">
              <p class="stats">Follower:{ 123}</p>
              <p class="stats">Following: 515</p>
            </div>
            <button class="follow-btn">Follow</button>
          </div>
        </div>
      </a>
    {/each}
  </div>
{:else}
  <p>No users found.</p>
{/if}

<style>
  .grid {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    padding: 1rem;
  }

  .user {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    background: #131313;
    box-shadow:
      5px 5px 10px 0px rgba(0, 0, 0, 0.5),
      -3px -3px 10px 0px rgba(255, 255, 255, 0.03);
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
  }

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: auto;
    height: 100%;
  }

  .stats-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    gap:0.3rem;
  }

  .follow-btn {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #6C5CD6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .follow-btn:hover {
    background-color: #0056b3;
  }

  p,
  .stats {
    margin: 0;
    color: #333;
  }

  .grid a{
    text-decoration: none;
    color: inherit;
  }

  .bio,
  .stats {
    font-size: 0.8rem;
    color: white;
  }

  .author {
    font-size: 1rem;
    color: white;
  }

  .author-name {
    font-size: 1rem;
    color: white;
  }

  .author-secondary {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .user:hover,
  .user:focus {
    transform: translateY(-5px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

</style>

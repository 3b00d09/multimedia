<script lang="ts">
  import { applyAction } from "$app/forms";
  import type { usersTable } from "$lib/server/schema";

  type User = typeof usersTable.$inferSelect;
  let isSearching = false;
  let searchTerm = "";
  let searchResults: User[] = [];
  export let appContainer:HTMLElement;
  export let searchModal: HTMLDivElement;

  const searchUsers = async () => {
    isSearching = !!searchTerm.trim();
    if (!isSearching) {
      searchResults = [];
      return;
    }

    const response = await fetch(
      `/api/users?search-query=${encodeURIComponent(searchTerm.trim())}`
    );
    if (response.ok) {
      searchResults = await response.json();
      isSearching = searchResults.length > 0;
    }
  };

  const toggleModal = () =>{
    searchModal.style.display = "block";
    appContainer.classList.add("blurred")
  }
</script>
<div class="app">
  <div class="homepage-content {isSearching ? 'blur' : ''}">

  </div>

  <div class="search-container">
    <form on:submit|preventDefault={searchUsers} class="search-form">
      <input
        on:click={toggleModal}
        type="text"
        bind:value={searchTerm}
        placeholder="Search users..."
        on:input={searchUsers}
        class="search-input"
      />
    </form>

    <div class="search-results {isSearching ? 'active' : ''}">
      {#if searchResults.length > 0}
        <ul>
          {#each searchResults as user}
            <li class="user-item">
              <img src={user.profilePictureUrl} alt={`${user.username}'s profile picture`} class="user-image">
              <span>{user.username}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
<style>
 .app {
  position: relative;
}

.homepage-content.blur {
  filter: blur(5px);
  transition: filter 0.3s;
}

.search-container {
  position: relative; 
  width: 300%;
}

.search-form {
  width: 100%; 
  display: grid;
}

.search-input {
  padding: 0.75rem;
  border-radius: 10px;
  font-size: 1rem;
  width: 100%; 
  box-shadow: -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset,
              2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font: inherit;
}

.search-results {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #131313;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-height: 300px;
  overflow-y: auto;
  border-radius: 0 0 10px 10px;
  z-index: 100;
}

.search-results.active {
  display: block;
}
.user-item {
  padding: 10px;
  display: flex;
  align-items: center;
  position: relative; 
}

.user-item::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 8px;
  background: #131313; 
  box-shadow: -5px -5px 5px 0px rgba(255, 255, 255, 0.05) inset, 5px 5px 5px 0px rgba(0, 0, 0, 0.50) inset;
}

.user-item:last-child::after {
  content: none; 
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-item span {
  margin-left: 1rem;
}


</style>

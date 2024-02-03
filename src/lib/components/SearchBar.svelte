<script lang="ts">
  import type { usersTable } from "$lib/server/schema";

  type User = typeof usersTable.$inferSelect;
  let isSearching = false;
  let modalSearchTerm = "";
  let searchResults: User[] = [];

  export let searchModal: HTMLDivElement;
  export let initialSearchInput: HTMLInputElement;

  const searchUsers = async () => {
    isSearching = !!modalSearchTerm.trim();
    if (!isSearching) {
      searchResults = [];
      return;
    }
    const response = await fetch(
      `/api/users?search-query=${encodeURIComponent(modalSearchTerm.trim())}`
    );
    if (response.ok) {
      searchResults = await response.json();
      isSearching = searchResults.length > 0;
    }
  };

  const resetSearch = () => {
    modalSearchTerm = "";
    searchResults = [];
  };

  const toggleModalOff = () => {
    searchModal.style.display = "none";
    resetSearch();
  };

  const toggleModal = () => {
    searchModal.style.display = "flex";
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form on:click={toggleModal} on:submit|preventDefault class="search-form">
  <input
    bind:this={initialSearchInput}
    type="text"
    placeholder="Search users..."
    class="search-input"
    readonly
  />
</form>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={toggleModalOff}
  bind:this={searchModal}
  class="search-modal"
  style="display: none;"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-content" on:click|stopPropagation>
    <form on:submit|preventDefault={searchUsers} class="modal-search-form">
      <input
        type="text"
        bind:value={modalSearchTerm}
        placeholder="Type to search users..."
        on:input={searchUsers}
        class="modal-search-input"
      />
    </form>

    <div class="modal-search-results {isSearching ? 'active' : ''}">
      {#if searchResults.length > 0}
        <ul>
          {#each searchResults as user}
            <li class="user-item">
              <img
                src={user.profilePictureUrl}
                alt={`${user.username}'s profile picture`}
                class="user-image"
              />
              <span>{user.username}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style>
  .search-form {
    display: grid;
    width: 100%;
  }

  .search-input,
  .modal-search-input {
    padding: 0.75rem;
    border-radius: 10px;
    font-size: 1rem;
    width: 100%;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset,
      2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
    background: transparent;
    border: none;
    outline: none;
    color: inherit;
    font: inherit;
  }
  .search-modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: #131313;
    padding: 20px;
    border-radius: 0.6em;
    width: 50%;
    box-sizing: border-box;
    margin: auto;
  }

  .modal-search-results {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    max-height: 60vh;
    overflow-y: auto;
    border-radius: 8px;
  }

  .user-item {
    padding: 10px;
    display: flex;
    align-items: center;
    background: #1b1b1b;
    margin-bottom: 2px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .user-item span {
    color: #fff; /* Light text for dark theme */
    background-color: #131313;
  }
  
</style>

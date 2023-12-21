<script lang="ts">
  import type { usersTable } from "$lib/server/schema";

  type User = typeof usersTable.$inferSelect;

  let searchTerm = "";
  let searchResults: User[] = [];

  const searchUsers = async () => {
    if (!searchTerm.trim()) {
      searchResults = [];
      return;
    }

    const response = await fetch(
      `/api/users?search-query=${encodeURIComponent(searchTerm.trim())}`
    );
    if (response.ok) {
      searchResults = await response.json();
    }
  };
</script>

<form on:submit|preventDefault={searchUsers}>
  <input
    type="text"
    bind:value={searchTerm}
    placeholder="Search users..."
    on:input={searchUsers}
    class="search-input"
  />
</form>
<div class="search-bar">
  {#if searchResults.length > 0}
    {#each searchResults as user}
      <li class="user-item">
        <span>{user.username}</span>
      </li>
    {/each}
  {/if}
</div>

<style>
  form {
    width: 100%;
    display: grid;
  }

  .search-bar {
    display: flex;
    align-items: center;
  }

  .search-input {
    padding: 0.75rem;
    border-radius: 10px;
    font-size: 0.65rem;
    flex-grow: 1;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset,
      2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
    background: transparent;
    border: none;
    outline: none;
    color: inherit;
    font: inherit;
  }

  .user-item {
    display: flex;
    align-items: center;
  }

  .user-item span {
    margin-left: 1rem;
  }
</style>

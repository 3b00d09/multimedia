<script lang="ts">
  import { goto } from "$app/navigation";

  let query: string = "";

  function performSearch() {
    if (query.trim()) {
      goto(`/explore/search/${encodeURIComponent(query)}`);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      performSearch();
    }
  }
</script>

<main>
  <form on:submit|preventDefault={performSearch} class="search-form">
    <input
      type="text"
      bind:value={query}
      placeholder="Search..."
      class="search-input"
      on:keydown={handleKeydown}
    />
  </form>

  <slot />
</main>

<style>
  .search-form {
    display: grid;
    width: 100%;
  }

  .search-input {
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
</style>

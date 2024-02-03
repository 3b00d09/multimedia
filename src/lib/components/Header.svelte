<script lang="ts">
  import SearchBar from "$lib/components/SearchBar.svelte";
  import type { User } from "lucia";
  export let user: User | null;
</script>

<header>
  <div></div>
 

  <div class="user-info">
    {#if !user}
      <button><a href="/login">Login</a></button>
      <button><a href="/register">Register</a></button>
    {:else}
      {`Welcome ${user.username}`}
      <button><a href="/logout">Logout</a></button>
    {/if}

  </div>
</header>

<style>

  .user-info{
    justify-self: flex-end;
    display: flex;
    gap: 1rem;
  }

  button{
    all: unset;
  }

  a{
    text-decoration: none;
    color: inherit;
  }
  a:hover{
    color: var(--action)
  }
  header {
    display: grid;
    gap: 3rem;
    align-items: baseline;
    grid-template-columns: repeat(3, 1fr);
    /* * 33% because main page has grid 33-33-33 and the header should be as wide as the middle section of the grid
    width: 33%; */
  }
  </style>
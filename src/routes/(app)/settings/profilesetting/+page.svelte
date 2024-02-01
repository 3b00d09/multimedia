<script lang="ts">
  import Linebreak from "$lib/components/Linebreak.svelte";
  import type { User } from "lucia";

  let user: User;
  let newUsername = '';
  let repeatNewUsername = '';

  const handleSubmit = async () => {
     if (!newUsername) {
      return alert("Please enter a new username");
    }

    const response = await fetch('/api/users', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({ username: newUsername }),
});
  }
</script>

<ul class="box-shadow">
  <li class="change-username">
  
    <form on:submit|preventDefault={handleSubmit} class="modal-search-form">
      <label for="new-username">New Username</label>
      <input
        type="text"
        id="new-username"
        bind:value={newUsername}
        placeholder="New Username"
      />

     

      <button type="submit">Update Username</button>
    </form>

  </li>
</ul>
<style>
  ul {
    list-style: none;
    display: grid;
    background: transparent;
    border-radius: 8px;
    padding: 1rem 1.75rem;
    height: 70vh;
    grid-template-columns: repeat(1, 16rem);
    grid-template-rows: repeat(4, auto) 1fr;

    grid-auto-rows: min-content;
    gap: 2rem;
    margin: 0 1.75rem;
    justify-self: end;
    width: fit-content;

    /** prevents the active::before from exploding*/
    align-items: baseline;
  }



  input {
    flex-grow: 2;
    padding: 1rem;
    border-radius: 1rem;
    flex-basis: 90%;
    height: auto;
    width: 100%;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset,
      2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
    background-color: transparent;
    border: none;
    color: inherit;
    font: inherit;
    resize: none;
    transition: border-radius 0.5s;
  }

  p {
    color: hsl(240, 5%, 64.9%);
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  button {
    color: white;
    padding: 10px 15px;
    width: 100%;
    margin-top: 1rem;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  ul li:nth-child(3) {
    align-self: end;
  }
</style>

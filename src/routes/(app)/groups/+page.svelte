<script lang="ts">
    import { enhance } from "$app/forms";
  import { quintInOut, quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";

    export let data;
    let createActive:boolean = false;
</script>


<div>
  <div class="container">
      <p>My Groups</p>
      <button on:click={()=>createActive = !createActive}>Create</button>
    </div>
    {#if createActive}
      <form in:slide={{duration: 500, axis: 'y', easing:quintOut}} out:slide={{duration: 500, axis: 'y', easing:quintOut}} action="?/createGroup" use:enhance method="POST">
          <input name="group-name" placeholder="Group Name">
          <textarea name="group-description" placeholder="Group Description"></textarea>
          <button type="submit">Create</button>
      </form>
    {/if}

  </div>
  {#if data.groups.length === 0}
    <p style="color:var(--text-secondary)">No items found</p>
  {:else}
      {#each data.groups as group}
          <div>
              <p>{group.name}</p>
              <p>{group.description}</p>
          </div>
      {/each}
  {/if}

<style>

div{
    align-self: start;
    display: grid;
    gap: 1rem;
    padding: 0.2rem 1rem;
}

button{
    all: unset;
    padding: 1rem;
    border-radius: 16px;
    border: 1px solid var(--action);
    width: fit-content;
    cursor: pointer;
    font-size: 1rem;
}

form{
    display: grid;
    gap: 1rem;
}

form > *{
    padding: 0.75rem;
    border-radius: 16px;
}

.container{
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

</style>
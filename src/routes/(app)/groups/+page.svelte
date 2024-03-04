<script lang="ts">
    import { enhance } from "$app/forms";
  import { quintInOut, quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import Group from "$lib/components/groups/Group.svelte"

    export let data;
    let createActive:boolean = false;
    let activeDialog:boolean = false;
    let dialog:HTMLDialogElement

    const toggleDialog = () =>{
      dialog.open ? dialog.close() : dialog.showModal()
    }
</script>


<div>
  <div class="container">
      <h2>My Groups</h2>
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
          
            <div class="groups-header">
              <p>Name</p>
              <p>Description</p>
              <p>Date</p>
              <p>Actions</p>
              </div>
            {#each data.groups as group}
              <Group {group}/>
          {/each}
  {/if}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <dialog bind:this={dialog} on:click|self={toggleDialog}>
          <div class="dialog">
            <p>Are you sure you want to delete this group?</p>
            <div class="dialog-btns">
              <button>Cancel</button>
              <button class="delete-btn">Delete</button>
            </div>
          </div>
      </dialog>
<style>

div{
    align-self: start;
    display: grid;
    gap: 1rem;
    padding: 0.25rem 0;
}

h2{
  font-size: 1.2rem;
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

.groups-header{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  border-bottom: 1px solid var(--text-secondary);
  padding: 1rem 0.25rem;
}


.groups-header{
  color: var(--text-secondary);
}

.groups-header > p:nth-child(4), .groups-header > p:nth-child(3){
  text-align: center;
}
.groups-header > p:nth-child(3){
  text-align: center;
}


  dialog::backdrop{
    backdrop-filter: blur(10px);
  }

  dialog{
    position: fixed; /* Use fixed positioning */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the dialog */
    background-color: var(--background);
    color: var(--text-primary);
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid transparent;
    box-shadow: -2px -2px 6px -4px rgba(0, 0, 0, 0.5), 2px 2px 6px 4px rgba(0, 0, 0, 0.5);
  }

    .dialog{
    display: grid;
    gap: 1rem;
  }

  .dialog-btns{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .delete-btn{
    background-color: #8b1111;
    color: var(--text-primary);
    border: none;
  }

</style>
<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation";
  import { toastStore } from "$lib/helpers/stores";
    import type {groupsTable} from "../../server/schema"
  import LoadingSpinner from "../LoadingSpinner.svelte";
    
    export let group: typeof groupsTable.$inferSelect

    let deleteDialog:HTMLDialogElement

    let message: string | null;
    let deleteBtn: HTMLButtonElement;
    let loading: boolean = false;

    const toggleExitDialog = () =>{
      deleteDialog.open ? deleteDialog.close() : deleteDialog.showModal()
      message = null;
      deleteBtn.disabled = false
    }

    const exitGroup = async() =>{
        loading = true;
        const req = await fetch(`/api/groups/leave/?id=${group.id}`,{
            method: "DELETE"
        })

        const res = await req.json()
        loading = false;
        message = res.message

        if(!res.error){
            deleteBtn.disabled = true
            invalidateAll()
            toastStore.set({
              active: true,
              message: res.message,
              status: "success"
            })
        }

    }
</script>

<div class="groups-container">
<p>{group.name}</p>
<p>{group.description ?? ""}</p>
<p style="text-align:center;">02/03/2024</p>
<div class="group-btns">
    <button on:click={toggleExitDialog}><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
</div>
</div>
  

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={deleteDialog} on:click|self={toggleExitDialog}>
    <div class="dialog">
    <p>Are you sure you want to exit this group?</p>
    <div class="dialog-btns">
        <button on:click={toggleExitDialog}>Cancel</button>
        <button bind:this={deleteBtn} on:click={exitGroup} class="delete-btn">Exit</button>
    </div>
        {#if loading}
            <LoadingSpinner centered={true}/>
        {/if}
        {#if message}
            <p style="text-align: center;">{message}</p>
        {/if}
    </div>
</dialog>


<style>
  
.groups-container{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  border-bottom: 1px solid var(--text-secondary);
  padding: 1rem 0.25rem;
}

.group-btns{
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.group-btns > button{
  all:unset;
  cursor: pointer;
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

  .delete-btn:disabled{
    background-color: gray;
    cursor:default;
  }

</style>
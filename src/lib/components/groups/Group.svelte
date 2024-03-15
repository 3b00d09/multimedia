<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";
    import type {groupsTable, usersTable} from "../../server/schema"
  import LoadingSpinner from "../LoadingSpinner.svelte";
  import AddMember from "./AddMember.svelte";
  import { toastStore } from "$lib/helpers/stores";
    
    export let group: typeof groupsTable.$inferSelect

    let deleteDialog:HTMLDialogElement
    let usersDialog:HTMLDialogElement

    let message: string | null;
    let deleteBtn: HTMLButtonElement;
    let loading: boolean = false;

    let followers: typeof usersTable.$inferSelect[]  | null = [];


    const toggleDeleteDialog = () =>{
      deleteDialog.open ? deleteDialog.close() : deleteDialog.showModal()
      message = null;
      deleteBtn.disabled = false
    }

    const toggleUsersDialog = () =>{
      usersDialog.open ? usersDialog.close() : usersDialog.showModal()
    }

    const deleteGroup = async() =>{
        loading = true;
        const req = await fetch(`/api/groups/manage/?id=${group.id}`,{
            method: "DELETE"
        })

        const res = await req.json()
        loading = false;
        message = res.message

        if(!res.error){
            deleteBtn.disabled = true
            invalidateAll()
            toastStore.set({
            status: res.error ? "error" : "success",
            active: true,
            message: res.message
          })
        }
    }

    onMount(async()=>{
      const req = await fetch("/api/mutuals")
      const res = await req.json()
      if(res.error){
        followers = null
      }
      else{
        followers = res.data
      }
    })
</script>

<div class="groups-container">
<p>{group.name}</p>
<p>{group.description ?? ""}</p>
<p style="text-align:center;">02/03/2024</p>
<div class="group-btns">
    <button on:click={toggleUsersDialog}><i class="fa-solid fa-pen-to-square"></i></button>
    <button on:click={toggleDeleteDialog}><i class="fa-solid fa-trash"></i></button>
</div>
</div>
  

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={deleteDialog} on:click|self={toggleDeleteDialog}>
    <div class="dialog">
    <p>Are you sure you want to delete this group?</p>
    <div class="dialog-btns">
        <button on:click={toggleDeleteDialog}>Cancel</button>
        <button bind:this={deleteBtn} on:click={deleteGroup} class="delete-btn">Delete</button>
    </div>
        {#if loading}
            <LoadingSpinner centered={true}/>
        {/if}
        {#if message}
            <p style="text-align: center;">{message}</p>
        {/if}
    </div>
</dialog>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={usersDialog} on:click|self={toggleUsersDialog}>
    <div class="manage-group">
        <div class="members-btns">
            <div>Add members</div>
            <p class="tooltip">Add people you follow each other</p>
        </div>
        {#if followers}
          <div class="users">
            {#each followers as follower}
                <AddMember user={follower} groupId={group.id}/>
              {/each}
          </div>
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
  
  .manage-group{
    display: grid;
    gap: 1rem;
  }

  .tooltip{
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }

  .users{
    position: relative;
    background-color: #000;
    border-radius: 16px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    width: 50rem;

  }

  .users::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://ikcxvcutdjftdsvbpwsa.supabase.co/storage/v1/object/sign/background-images/default-img.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLWltYWdlcy9kZWZhdWx0LWltZy5wbmciLCJpYXQiOjE3MDc2MDc0NTcsImV4cCI6MTAzNDc1MjEwNTd9.jVcmsigcoSU1nrIv6ci71_VZrpFv0mzTvv6XuW2J_Aw&t=2024-02-10T23%3A24%3A20.028Z");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.2;
  }
</style>
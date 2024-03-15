<script lang="ts">
  import { toastStore } from "$lib/helpers/stores";
  import type { UserType } from "$lib/helpers/types";
  import { onMount } from "svelte";

    export let user: UserType;
    export let groupId: string;
    let isMember: boolean | null = null;
    let error: boolean = false;

    const checkMembership = async() =>{
        const req = await fetch(`/api/groups/manage/members/?groupId=${groupId}&user=${user.id}`)
        const res = await req.json()
        error = res.error;

        if(!error){
            isMember = res.isMember
        }
    }
    const addMember = async() =>{
        const req = await fetch("/api/groups/manage/members/",{
          method: "POST",
          headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ groupId: groupId, userId: user.id }),
        })

        const res = await req.json()
        
        toastStore.set({
          status: res.error ? "error" : "success",
          active: true,
          message: res.message
        })
        checkMembership()
    }

    const removeMember = async() =>{
        const req = await fetch(`/api/groups/manage/members/?groupId=${groupId}&userId=${user.id}`,{
          method: "DELETE",
        })

        const res = await req.json()
        toastStore.set({
          status: res.error ? "error" : "success",
          active: true,
          message: res.message
        })
        checkMembership()
    }
    
    onMount(async()=>{
        checkMembership()
    })
</script>
{#if isMember != null}
<div class="user-info">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={user.profileBackgroundUrl}>
    <p>{user.username}</p>
</div>
  {#if !isMember}
    <button on:click={addMember}>Add</button>
  {:else }
    <button on:click={removeMember}>Remove</button>
  {/if}
{/if}

<style>
  .user-info > img{
    width:3rem;
  }
  
  .user-info{
    display: flex;
    align-items: center;
  }

  button{
    z-index: 88;
}
</style>
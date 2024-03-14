<script lang="ts">
  import type { UserType } from "$lib/helpers/types";
  import { onMount } from "svelte";

    export let user: UserType;
    export let groupId: string;
    let isMember: boolean;
    let error: boolean = false;

    onMount(async()=>{
        const req = await fetch(`/api/groups/member/?groupId=${groupId}&user=${user.id}`)
        const res = await req.json()
        error = res.error;

        if(!error){
            isMember = res.isMember
        }

    })
</script>

<div class="user-info">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={user.profileBackgroundUrl}>
    <p>{user.username}</p>
</div>
<button>Add</button>

<style>
  .user-info > img{
    width:3rem;
  }
  
  .user-info{
    display: flex;
    align-items: center;
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
</style>
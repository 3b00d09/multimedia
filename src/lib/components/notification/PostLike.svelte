<script lang="ts">
  import { goto } from "$app/navigation";
  import type { NotificationType, UserType } from "$lib/helpers/types";
  import { onMount } from "svelte";

    export let notification: NotificationType;

    let data:{sourceUser: UserType, content:any}

    onMount(async()=>{
      const req = await fetch(`/api/notification/?id=${notification.notification.id}&type=${notification.notification.entityType}`)
      const res = await req.json()
      data = res.data
    })

    const navigateToSource = () =>{
      goto(`/post/${notification.notification.entityId}`) 
    }
</script>

{#if data}
<button on:click={navigateToSource}>
  <div class="container">
    <div class="user">
      <img src={data.sourceUser.profilePictureUrl} alt="User Profile Icon"/>
      <p>{data.sourceUser.username} liked your post</p>
    </div>
    <p class="content">{data.content.content}</p>
  </div>
</button>
{/if}


<style>
  button{
    all:unset;
    cursor: pointer;
  }
  .container{
    border: 1px solid var(--action);
    padding: 1rem;
    border-radius: 16px;
  }

  img{
    width: 3rem;
  }

  .user{
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .content{
    color: var(--text-secondary);
  }
</style>
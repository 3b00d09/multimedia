<script lang="ts"> 
  import NotificationBell from "./notification/NotificationBell.svelte";
  import type { NotificationType } from "$lib/helpers/types";
  import type {UserType} from "../helpers/types"
  export let user: UserType | undefined | null;
  export let notifications: NotificationType[] | undefined
</script>

<header>

  <div class="user-info">
    {#if !user}
      <button><a href="/login">Login</a></button>
      <button><a href="/register">Register</a></button>
    {:else}
      <NotificationBell {notifications}/>
      {`Welcome ${user.username}`}
      <button><a href="/logout">Logout</a></button>
    {/if}

  </div>
</header>

<style>

  .user-info{
    justify-self: flex-end;
    display: flex;
    align-items: center;
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
    /* * 33% because main page has grid 33-33-33 and the header should be as wide as the middle section of the grid
    width: 33%; */
  }
  </style>
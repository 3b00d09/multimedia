<script lang="ts"> 
  import NotificationBell from "./NotificationBell.svelte";
  import type { NotificationType } from "$lib/helpers/types";
  import type {UserType} from "../../helpers/types"
  export let user: UserType | undefined | null;
  export let notifications: NotificationType[] | undefined
</script>

<header>

  <img src="/images/icons/logo.png" alt="Website Logo" />
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
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    align-items: center;
    grid-column: span 3;

    /* * 33% because main page has grid 33-33-33 and the header should be as wide as the middle section of the grid
    width: 33%; */
  }

  img{
    width: 6rem;
    margin-left: 1rem;
  }
  </style>
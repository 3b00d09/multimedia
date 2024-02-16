<script lang="ts">
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import LoadingSpinner from "./LoadingSpinner.svelte";
    export let visable:boolean = false;
    type response = {
        username: string;
        profilePictureUrl: string;
    }[];
    let likes;

    export let postId: string;

    const dispatch = createEventDispatcher();
    let promise: Promise<response>;
    const toggleOff = () => {
        visable = !visable;
        dispatch("toggle");
    };
    async function fetchUsers() {
        const data = await fetch(`/api/post-likes/?post=${postId}`);
        const res = await data.json();
        if (res.error) {
        return Promise.reject(res.message);
        }
        return res.data;
    }
    $: {
        if (visable) {
        promise = fetchUsers();
        }
    }
    onDestroy(() => {
        visable = false;
    });

</script>

<button class="modal" class:visable on:click={toggleOff}>
  {#await promise}
    <LoadingSpinner />
  {:then likes}
    {#if likes}
      {#if likes.length === 0}
        <p>no users found</p>
      {:else}
        <div class="users-container">
          {#each likes as user}
            <a href={`/users/${user.username}`} class="user">
              <img src={user.profilePictureUrl} alt="Profile Icon" />
              <p>{user.username}</p>
            </a>
          {/each}
        </div>
      {/if}
    {/if}
  {:catch error}
    <p>{error}</p>
  {/await}
</button>


<style>
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);
  }

    .visable {
        display: flex;
    }
    .users-container {
        display: grid;
        gap: 1rem;
    }
    .user > img {
        border-radius: 50%;
        object-fit: cover;
        width: 5rem;
        height: 5rem;
    }
    .user {
        text-decoration: none;
        color: var(--text);
        font-size: 1.25rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(5, 5, 5, 0.8);
    }
</style>
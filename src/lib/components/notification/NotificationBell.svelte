<script lang="ts">
    import type { NotificationType } from "$lib/types";
    import { onMount } from "svelte";
  import PostNotification from "./PostNotification.svelte";

    let active = false;
    export let notifications:NotificationType[] | undefined

    onMount(()=>{
        console.log(notifications)
    })
</script>

    <button class="container" on:click={()=>active = !active}>
        <img src="/images/icons/notification-bell.png" alt="Notifications icon">
        <div class:active class="notifications-container">
            {#if notifications}
                {#each notifications as notification}
                    <PostNotification {notification}/>
                {/each}
            {:else}
                <p>No notifications</p>
            {/if}
        </div>
    </button>



<style>

    img{
        width: 26px;
        cursor: pointer;
    }
    button{
        all: unset;
        position: relative;
    }

    .container{
        display: flex;
        flex-direction: column;
    }

    /**https://codepen.io/lideo/pen/KKGeQG*/
    .notifications-container{
        display: none;
        width: max-content;
        color: #fff;
        position: absolute;
        padding: 1rem;
        border-radius: 10%;
        right: -30px;
        top: 50px;
        background-color: black;
    }

    .notifications-container:after {
        content: " ";
        position: absolute;
        right: 30px;
        top: -15px;
        border-top: none;
        border-right: 15px solid transparent;
        border-left: 15px solid transparent;
        border-bottom: 15px solid black;
    }

    .active{
        display: grid;
        gap: 1rem;
    }

</style>
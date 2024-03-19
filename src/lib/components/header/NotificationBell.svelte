<script lang="ts">
    import type { NotificationType } from "$lib/helpers/types";
    import Notification from "../notification/Notification.svelte";
    import { fly } from "svelte/transition";
    
    let active = false;
    export let notifications:NotificationType[] | undefined

</script>

    <button class="container" on:click={()=>active = !active}>
        <img src="/images/icons/notification-bell.png" alt="Notifications icon">
        
            {#if active}
                <div in:fly={{duration: 250, y: -50, opacity: 1}} out:fly={{duration: 250, y: -50, opacity: 0}} class="notifications-container">
                    {#if notifications && notifications?.length > 0}
                        {#each notifications as notification}
                            <Notification {notification}/>
                        {/each}
                        <a href="/notifications">View All</a>
                    {:else}
                        <p>No notifications</p>
                    {/if}
                </div>
            {/if}

    </button>



<style>

    img{
        width: 26px;
        cursor: pointer;
    }
    button{
        position: relative;
        border: none;
        padding: 0;
    }

    a{
        color: inherit;
        text-decoration: none;
        text-align: center;
        border: 1px solid var(--action);
        width: fit-content;
        padding: 0.6rem;
        border-radius: 16px;
        justify-self: center;
    }

    .container{
        display: flex;
        flex-direction: column;
        z-index: 9999;
    }

    /**https://codepen.io/lideo/pen/KKGeQG*/
    .notifications-container{
        display: grid;
        gap: 1rem;
        width: 18rem;
        color: #fff;
        position: absolute;
        padding: 0.75rem;
        border-radius: 16px;
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

    .notifications-container > *{
        border: 1px solid var(--action)
    }

</style>
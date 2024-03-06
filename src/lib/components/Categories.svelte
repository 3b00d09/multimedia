<script lang="ts">
  import { onMount } from "svelte";
  import SearchBar from "./SearchBar.svelte";
  import { page } from "$app/stores";
    import { fly, slide } from "svelte/transition";
  import { quintIn, quintInOut, quintOut } from "svelte/easing";
  import type { groupsTable } from "$lib/server/schema";

    export let groups: typeof groupsTable.$inferSelect[];
    
    let displayCategories: boolean = false
    let displayGroups: boolean = false;
    let currentLocation:string = "";

    const toggleCategories = () =>{
        displayCategories = !displayCategories;
        displayGroups = false;
    }

    const toggleGroups = () =>{
        displayCategories = false;
        displayGroups = !displayGroups;
    }
    onMount(()=>currentLocation=window.location.pathname)

    $:{
        let path = $page.url.pathname.split("/")
        currentLocation = path[1]
        currentLocation = currentLocation
    }

</script>
<SearchBar/>
<div class="categories-header">
    <a href="/"><button class:active={currentLocation.length === 0}>For You</button></a>
    <a href="/following"><button class:active={currentLocation === "following"}>Following</button></a>
</div>
<div class="btns-container">
   <button class="categories" class:active-btn={displayCategories} on:click={toggleCategories}>Categories</button>
    <button class="groups" class:active-btn={displayGroups} on:click={toggleGroups}>Groups</button> 
</div>


{#if displayCategories}
<ul in:slide={{duration: 500, axis: 'y', }} out:slide={{duration: 300, axis: 'y'}}>
    <li>Comedy</li>
    <li>Sad</li>
    <li>Sci-Fi</li>
    <li>News</li>
</ul>
{/if}

{#if displayGroups}
<ul in:slide={{duration: 500, axis: 'y', }} out:slide={{duration: 300, axis: 'y'}}>
    {#if groups.length > 0}
        {#each groups as group}
            <li>{group.name}</li>
        {/each}
    {:else}
        <p>No groups joined.</p>
    {/if}
</ul>
{/if}


<style>
    a{
        all:unset;
    }
    .categories-header{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }
    
    ul{
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        list-style: none;
    }

    li{
        /* box-shadow: 2px 0px 6px -5px rgba(226, 224, 224, 0.5) inset,
              0px 0px 5px 0px rgba(0, 0, 0, 0.5);
        padding: 1rem;
        border-radius: 16px; */
        font-size: 1rem;

        padding: 0.75rem 1.15rem;
        border-radius: 10px;
        background: #131313;
        box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.50), -3px -3px 10px 0px rgba(255, 255, 255, 0.03);
        min-width: fit-content;
    }

    button{
        border: 0;
        color: var(--text-secondary);
        font-size: 1.2rem;
    }

    .btns-container{
        justify-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .categories, .groups{
        color: inherit;
        font-size: 0.8rem;
        padding: 0.75rem;
        border: 1px solid var(--action);
    }

    .active-btn{
        background-color: var(--action);
    }

    .active{
        position: relative;
        color:var(--text);
    }

    .active::before{
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        top: 10;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--action);
        filter: drop-shadow(0px 0px 5px rgba(108, 92, 214, 0.50));
    }
</style>
<script lang="ts">
  import Categories from "$lib/components/Categories.svelte";
    export let data;
    import Linebreak from "$lib/components/Linebreak.svelte";
    import Post from "$lib/components/post/Post.svelte";
    import PostForm from "$lib/components/post/PostForm.svelte";
    import { mainContainerStore } from "$lib/helpers/stores.js";
  import { quintIn, quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";

  let categories: HTMLDivElement;



</script>
<div>
    <!-- need a target to scroll to and i cant target an-->
    <div bind:this={categories} class="placeholder"></div>
    <Categories groups={data.groups} />
    <PostForm />

    <button class="header" class:active={$mainContainerStore.active} on:click={()=>categories.scrollIntoView({behavior: "smooth"})}>Back To Top</button>

    {#if data}
        <div class="posts-container">
            {#each data.rows as row}
                <Post post={row}/>
                <Linebreak/> 
            {/each}
        </div>
    {/if}
    

</div>

<style>

    .placeholder{
        height: 1px;
    }

    .header{
        all: unset;
        cursor: pointer;
        position: sticky;
        top: 0;
        padding: 0.5rem;
        background-color: var(--background);
        border-radius: 8px;
        z-index: 999;
        text-align: center;
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    .active{
        visibility: visible; /* Show the element */
        opacity: 1; /* Make it opaque */
        transform: translateY(0); /* Move it to its original position */
        animation: slide-up 0.5s forwards; /* Apply the slide-up animation */
    }

    @keyframes slide-up {
        0% {
            transform: translateY(20px); /* Start a bit lower */
        }
        50% {
            transform: translateY(-10px); /* Slide down a bit */
        }
        100% {
            transform: translateY(0); /* End at the original position */
        }
    }

    div{
        justify-self: center;
        display: grid;
        gap: 1.25rem;
        width: 100%;
        position: relative;
    }

    .posts-container{
        display: grid;
        gap: 1rem;
    }
</style>
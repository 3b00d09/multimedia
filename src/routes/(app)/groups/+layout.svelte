<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

    let currentLocation:string = "";
    let path:string[];
    onMount(()=>currentLocation=window.location.pathname)

    $:{
        path = $page.url.pathname.split("/").filter((el)=>el!=="")
        
    }
</script>

<div class="container">
    <div>
        <a class:active={path.length === 1} href="/groups">Created Groups</a>
        <a class:active={path.length === 2} href="/groups/joined">Joined Groups</a>
    </div>
    <slot/>
</div>

<style>
    .container{
        display: grid;
        gap: 1rem;
        align-self: start;
    }

    .container > div{
        display: flex;
        gap: 3rem;
        align-items: center;
        justify-self: center;
    }

    a{
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 1.2rem;
        padding: 1rem;
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
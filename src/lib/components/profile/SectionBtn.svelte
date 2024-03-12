<script lang="ts">
    
    import { onMount } from "svelte";
    import { page } from '$app/stores';

    export let name:string;
    export let username:string = "";

    let currentLocation:string = "";
    onMount(()=>currentLocation=window.location.pathname)

    $:{
        let path = $page.url.pathname.split("/")
        path = path.filter((item)=>item.length>0)
        currentLocation = path[path.length - 1]
        currentLocation = currentLocation
    }
</script>

<a href={name === "Posts" ? `/users/${username}` : `/users/${username}/${name.toLowerCase()}`}>
    <button class:active={name.toLowerCase() === currentLocation || currentLocation === username && name==="Posts"}>
        {name}
    </button>
</a>

<style>
    button{
        all:unset;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.75rem 1.15rem;
        border-radius: 10px;
        background: #131313;
        box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.50), -3px -3px 10px 0px rgba(255, 255, 255, 0.03);
        min-width: fit-content;
        
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    .active{
        border: 1px solid purple;
    }
</style>
<script lang="ts">
  import { onMount } from "svelte";
  import { page } from '$app/stores';


    export let imgRoute:string;
    export let name:string;

    let currentLocation:string = "";
    onMount(()=>currentLocation=window.location.pathname)

    $:{
        currentLocation = $page.url.pathname.slice(1)
        currentLocation = currentLocation
    }

</script>

<button class:active={name.toLowerCase()===currentLocation || name=="Home" && currentLocation.length === 0}>
    <img src={`/images/icons/${imgRoute}`} alt={`${name} Icon`}/>
    <p>{name}</p>
</button>




<style>
    button{
        padding: .45rem;
        border: none;
        color: inherit;
        text-align: center;
        opacity: 0.2;
    }

    button > img{
        width: 100%;
    }

    
    .active{
        opacity: 1;
        position: relative;
    }

    .active::before{
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom :0;
        background-color: var(--action);
        filter: drop-shadow(0px 0px 5px rgba(108, 92, 214, 0.50));
        width: 1px;
    }
</style>
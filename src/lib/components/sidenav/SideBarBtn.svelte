<script lang="ts">
  import { onMount } from "svelte";
  import { page } from '$app/stores';


    export let imgRoute:string;
    export let name:string;
    export let username: string | undefined = undefined;

    let currentLocation:string = "";
    let user: string | undefined;
    onMount(()=>currentLocation=window.location.pathname)

    $:{
        let path = $page.url.pathname.split("/")
        currentLocation = path[1]
        currentLocation = currentLocation
        user = "";

        if(currentLocation === "users"){
            user = path[2]
        }
    }
</script>

<button class:active={name.toLowerCase()===currentLocation || name=="Home" && currentLocation.length === 0 || name == "Profile" && user === username}>
    <img src={`/images/icons/${imgRoute}`} alt={`${name} Icon`}/>
    <p>{name}</p>
</button>




<style>
    button{
        font-size: 0.8rem;
        padding: 0.4rem;
        border: none;
        color: inherit;
        text-align: center;
        opacity: 0.2;
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
        filter: drop-shadow(0px 0px 5px rgba(252, 252, 253, 0.5));
        width: 1px;
    }
</style>
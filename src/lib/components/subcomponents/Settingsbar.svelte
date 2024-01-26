<script lang="ts">
  import { onMount } from "svelte";
  import { page } from '$app/stores';


    export let imgRoute:string;
    export let name:string;
    export let description: string;
    export let key:string;

    let currentLocation:string = "";
    onMount(()=>currentLocation=window.location.pathname)

    $:{
      let path = $page.url.pathname.split("/")
      console.log(path)
        currentLocation = path[path.length -1]
        currentLocation = currentLocation
        console.log(currentLocation)
    }

</script>

<button class:active={key.toLowerCase() === currentLocation}>
  <img src={`/images/icons/${imgRoute}`} alt={`${name} Icon`}/>
  <div class="text-container">
      <p>{name}</p>
      <p>{description}</p>
  </div>
</button>



<style>
  button {
        display: flex;
        align-items: center;
        gap: 10px; /* Adjust the gap as needed */
        padding: .45rem;
        border: none;
        color: inherit;
        text-align: left;
        opacity: 0.2;
    }
    button > img {
    width: 3rem; 
    height: 3rem; 
    object-fit: contain; 
}

.text-container {
        display: flex;
        flex-direction: column;
    }

    
    .active {
        opacity: 1;
        position: relative;
    }
.text-container > p:first-child {
        color: white; 
        font-size: 1.2rem;
        margin: 0; 
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
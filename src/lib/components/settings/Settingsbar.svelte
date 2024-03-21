<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  export let imgRoute: string;
  export let name: string;
  export let description: string;
  export let key: string;

  let currentLocation: string = "";
  onMount(() => (currentLocation = window.location.pathname));

  $: {
    let path = $page.url.pathname.split("/")
        path = path.filter((item)=>item.length>0)
        currentLocation = path[path.length - 1]
        currentLocation = currentLocation
  }
</script>

<button class:active={key.toLowerCase() === currentLocation}>
  <img src={`/images/icons/${imgRoute}`} alt={`${name} Icon`} />
  <div class="text-container">
    <p>{name}</p>
    <p class="description">{description}</p>
  </div>
</button>

<style>
  button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.45rem;
    border: none;
    color: inherit;
    text-align: left;
    opacity: 0.2;
  }

  button > img {
    width: 2rem;
    height: 2rem;
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

  .description{
    color: var(--text-secondary);
  }
  .active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--action);
    width: 2px;
  }
</style>

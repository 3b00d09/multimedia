<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  export let name: string;

  let currentLocation: string = "";
  let user: string | undefined;
  onMount(() => (currentLocation = window.location.pathname));

  $: {
    let path = $page.url.pathname.split("/");
    currentLocation = path[1];
    currentLocation = currentLocation;
  }
</script>

<button class:active={name.toLowerCase() === currentLocation}>
  <p>{name}</p>
</button>

<style>
  button {
    color: white;
    padding: 10px 15px;
    width: 100%;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    transform: translateY(-5px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

  .active {
    opacity: 1;
    position: relative;
  }

  .active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    filter: drop-shadow(0px 0px 5px rgba(248, 248, 250, 0.5));
    width: 6px;
  }
</style>

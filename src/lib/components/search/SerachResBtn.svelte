<script lang="ts">
  import { page } from "$app/stores";

  export let name: string;

  $: pathSegments = $page.url.pathname.split("/").filter(Boolean);
  $: currentLocation = pathSegments[pathSegments.length - 1];

  $: isBasePath = pathSegments.length === 3;

  $: isActive =
    (name.toLowerCase() === currentLocation && pathSegments.length > 3) ||
    (name === "Show All" && isBasePath);
</script>

<button class:active={isActive}>
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
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease,
      border-color 0.3s ease;
    position: relative;
  }

  button:hover {
    transform: translateY(-5px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

  .active {
    opacity: 1;
  }

  .active::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid var(--action);
    border-radius: 0.5rem;
    pointer-events: none;
  }
</style>

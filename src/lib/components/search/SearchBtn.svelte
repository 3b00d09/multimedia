<script lang="ts">
  import { page } from '$app/stores';

  export let name: string;

  $: pathSegments = $page.url.pathname.split('/').filter(Boolean); 

  $: isActive = (() => {
    if (name.toLowerCase() === 'search') {
      return pathSegments.length === 1 && pathSegments[0].toLowerCase() === 'search';
    }
 
    return pathSegments.length > 1 && pathSegments[1].toLowerCase() === name.toLowerCase();
  })();
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

  .active::before{
        content:"";
        position: absolute;
        top: 0;
        left: 50%;
        bottom :-1rem;
        height: 5rem;
        transform: rotate(90deg); 
        width: 100%;
        background-color: var(--action);
        filter: drop-shadow(0px 0px 5px rgba(108, 92, 214, 0.50));
        width: 2px;
    }
</style>

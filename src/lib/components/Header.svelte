<script lang="ts">
  import SearchBar from "./SearchBar.svelte";

  export let appContainer: HTMLElement;
  export let searchModal: HTMLDivElement;
</script>

<header>
  <SearchBar {appContainer} {searchModal} />
</header>

<style>
  header {
    display: flex;
    align-items: baseline;
    /** 33% because main page has grid 33-33-33 and the header should be as wide as the middle section of the grid*/
    width: 33%;
    justify-self: center;
  }
</style>

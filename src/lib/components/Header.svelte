<script lang="ts">
  import SearchBar from "$lib/components/SearchBar.svelte";
  export let searchModal: HTMLDivElement;
  export let initialSearchInput: HTMLInputElement;
</script>

<header>
  <SearchBar {searchModal} {initialSearchInput} />
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
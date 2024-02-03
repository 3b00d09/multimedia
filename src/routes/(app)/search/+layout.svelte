<script>
  import Search from "$lib/components/search/Search.svelte";
</script>

<main>
  <div class="main container">
    <div class="container">
      <Search />
      <slot />
    </div>
  </div>
</main>

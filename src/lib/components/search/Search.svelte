<script lang="ts">
  import "../../../global.css";
  import SearchBtn from "./SearchBtn.svelte";
  let displayMode = 'all';
</script>

<ul>
  <a href="/search/user"
    ><li class="icon-container"><SearchBtn name={"User"} /></li></a
  >
  <a href="/search/post"
    ><li class="icon-container"><SearchBtn name={"Post"} /></li></a
  >
</ul>

<style>
  ul {
    display: flex;
    text-align: center;
    border: none;
    justify-content: space-evenly;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
</style>

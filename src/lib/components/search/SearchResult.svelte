<script lang="ts">
  import { page } from '$app/stores';
  import "../../../global.css";
  import SearchBtn from "./SearchBtn.svelte";


  $: query = $page.params.query;
</script>

<ul>
 
  <a href={`/explore/search/${query}/user`}>
    <li class="icon-container"><SearchBtn name={"User"} /></li>
  </a>
 
  <a href={`/explore/search/${query}/post`}>
    <li class="icon-container"><SearchBtn name={"post"} /></li>
  </a>
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
